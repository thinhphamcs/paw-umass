// Import Require
const { User, Asset } = require('../models');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { JWT_SECRET, STRIPE_SECRET_TEST } = require('../config/env.json');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const stripe = require("stripe")(STRIPE_SECRET_TEST);
const { uploadToS3, getObjectFromS3 } = require('../s3');
// Exports the following functions
module.exports = {
    Query: {
        getUser: async (parent, args, context, info) => {
            try {
                let user;
                // Check token in headers
                if (context.req && context.req.headers.authorization) {
                    const token = context.req.headers.authorization.split('Bearer ')[1]; // split after bearer
                    jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
                        if (error) {
                            throw new AuthenticationError('Unauthenticated');
                        }
                        user = decodedToken
                    })
                }
                if (user.email) {
                    const users = await User.findOne({
                        where: { email: user.email }
                    });
                    return users;
                }
                if (user.phone) {
                    const users = await User.findOne({
                        where: { phone: user.phone }
                    });
                    return users;
                }
            } catch (error) {
                throw error;
            }
        },
        login: async (parent, args, context, info) => {
            let { email, password } = args;
            let errors = {}
            try {
                const user = await User.findOne({
                    where: { email }
                });
                if (!user) {
                    errors.email = 'Email is not exist'
                    throw new UserInputError('User is not found', { errors });
                }
                const correctPassword = await bcrypt.compare(password, user.password);
                if (!correctPassword) {
                    errors.password = 'Password is incorrect'
                    throw new UserInputError('Password is incorrect', { errors });
                }
                const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
                user.token = token;
                return user;
            } catch (error) {
                throw error;
            }
        },
        checkUser: async (parent, args, context, info) => {
            let { email, phone } = args;
            let errors = {}
            let user = null;
            try {
                if (email && !phone) {
                    user = await User.findOne({
                        where: {
                            email: email
                        }
                    });
                    if (!user) {
                        errors.email = 'Email is not exist';
                        throw new UserInputError('User is not found', { errors });
                    }
                    else {
                        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
                        user.token = token;
                        return user;
                    }
                }
                if (!email && phone) {
                    user = await User.findOne({
                        where: {
                            phone: phone
                        }
                    });
                    if (!user) {
                        errors.phone = 'Phone number does not exist';
                        throw new UserInputError('User is not found', { errors });
                    }
                    else {
                        const phone = user.phone;
                        const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: '1h' });
                        user.token = token;
                        return user;
                    }
                }
            } catch (error) {
                throw error;
            }
        },
        getAssets: async (parent, args, context, info) => {
            try {
                let errors = {};
                const assets = await Asset.findAll();
                if (assets) {
                    const mapping = assets.map((value, index) => {
                        const readStream = getObjectFromS3(value.photo);
                        return {
                            id: value.id,
                            email: value.email,
                            phone: value.phone,
                            petName: value.petName,
                            breed: value.breed,
                            photo: readStream,
                            description: value.description,
                            howLong: value.howLong,
                            date: value.date.toISOString().slice(0, 19).replace('T', ' '),
                            token: value.token,
                            availability: value.availability
                        };
                    });
                    const data = await Promise.all(mapping);
                    return data;
                }
                else {
                    errors.message = "Assets no longer exist";
                    throw errors;
                }
            } catch (error) {
                throw error;
            }
        },
    },
    Mutation: {
        register: async (parent, args, context, info) => {
            let { firstName, lastName, email, password, confirmPassword, phone } = args;
            const donation = false, availability = false, token = "JmLTEyMy11LTEyMy1jLTEyMy1rLTEyMy15LTEyMy1vLTEyMy11";
            let errors = {}
            try {
                // Validate input data 
                if (password !== confirmPassword) {
                    errors.confirmPassword = "Passwords must match";
                    throw errors;
                }
                if (phone.length > 12 || phone.length < 12) {
                    errors.phone = "Must be a valid phone number";
                    throw errors;
                }
                // Hash password
                password = await bcrypt.hash(password, 6);
                // Create user
                const user = await User.create({
                    firstName, lastName, email, password, phone, donation, availability, token
                })
                // Return response
                if (user) {
                    return {
                        status: 200,
                        message: "User Created"
                    }
                }
                else {
                    errors.create = "Failed to create user"
                    throw errors;
                }
            } catch (error) {
                // Add Sequelize errors into errors variable defined above
                if (error.name === "SequelizeUniqueConstraintError") {
                    error.errors.forEach(e => (errors[e.path.split(".")[1]] = `Email is already taken`));
                }
                else if (error.name === "SequelizeValidationError") {
                    error.errors.forEach(e => (errors[e.path] = e.message));
                }
                // Throw errors as Bad input
                throw new UserInputError('Bad input', { errors });
            }
        },
        profileUpdate: async (parent, args, context, info) => {
            let { firstName, lastName, email, phone } = args;
            let errors = {};
            let user = null;
            const token = context.req.headers.authorization.split("Bearer ")[1];
            try {
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const expiresAt = new Date(decodedToken.exp * 1000);
                    // Expired token
                    if (new Date() > expiresAt) {
                        errors.token = "Token Expired";
                        throw errors;
                    }
                    else {
                        user = decodedToken;
                        // If first name only case
                        if (firstName && !lastName && !email && !phone) {
                            const values = { firstName: firstName };
                            const selector = {
                                where: { email: user.email }
                            };
                            const update = await User.update(values, selector);
                            if (update) {
                                return {
                                    status: 200,
                                    message: "Profile Updated"
                                }
                            }
                            else {
                                errors.update = "Failed to update"
                                throw errors;
                            }
                        }
                        // If last name only case
                        if (lastName && !firstName && !email && !phone) {
                            const values = { lastName: lastName };
                            const selector = {
                                where: { email: user.email }
                            };
                            const update = await User.update(values, selector);
                            if (update) {
                                return {
                                    status: 200,
                                    message: "Profile Updated"
                                }
                            }
                            else {
                                errors.update = "Failed to update"
                                throw errors;
                            }
                        }
                        // If email field only case
                        if (email && !firstName && !lastName && !phone) {
                            const values = { email: email };
                            const selector = {
                                where: { email: user.email }
                            };
                            const update = await User.update(values, selector);
                            if (update) {
                                return {
                                    status: 200,
                                    message: "Profile Updated"
                                }
                            }
                            else {
                                errors.update = "Failed to update"
                                throw errors;
                            }
                        }
                        // If phone field only case
                        if (phone && !firstName && !lastName && !email) {
                            if (phone.length > 12 || phone.length < 12) {
                                errors.phone = "Must be a valid phone number"
                                throw errors;
                            }
                            else if (phone.length === 12) {
                                const values = { phone: phone };
                                const selector = {
                                    where: { email: user.email }
                                };
                                const update = await User.update(values, selector);
                                if (update) {
                                    return {
                                        status: 200,
                                        message: "Profile Updated"
                                    }
                                }
                                else {
                                    errors.update = "Failed to update"
                                    throw errors;
                                }
                            }
                        }
                        // If everything only case
                        if (firstName && lastName && email && phone) {
                            if (phone.length > 12 || phone.length < 12) {
                                errors.phone = "Must be a valid phone number"
                                throw errors;
                            }
                            else if (phone.length === 12) {
                                const values = { firstName: firstName, lastName: lastName, email: email, phone: phone };
                                const selector = {
                                    where: { email: user.email }
                                };
                                const update = await User.update(values, selector);
                                if (update) {
                                    return {
                                        status: 200,
                                        message: "Profile Updated"
                                    }
                                }
                                else {
                                    errors.update = "Failed to update"
                                    throw errors;
                                }
                            }
                        }
                    }
                }
                else {
                    errors.token = "No token found";
                    throw errors;
                }
            } catch (error) {
                if (error.name === "SequelizeUniqueConstraintError") {
                    error.errors.forEach(e => (errors[e.path.split(".")[1]] = `Email is already taken`));
                }
                else if (error.name === "SequelizeValidationError") {
                    error.errors.forEach(e => (errors[e.path] = e.message));
                }
                // Throw errors as Bad input
                throw new UserInputError('Bad input', { errors });
            }
        },
        changePassword: async (parent, args, context, info) => {
            let { newPassword, confirmNewPassword } = args;
            let errors = {};
            let currentUser = null;
            const token = context.req.headers.authorization.split("Bearer ")[1];
            try {
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const expiresAt = new Date(decodedToken.exp * 1000);
                    // Expired token
                    if (new Date() > expiresAt) {
                        errors.token = "Token Expired";
                        throw errors;
                    }
                    else {
                        // If password do not match
                        if (newPassword !== confirmNewPassword) {
                            errors.password = "Passwords must match";
                            throw errors;
                        }
                        else {
                            currentUser = decodedToken;
                            if (currentUser.email) {
                                const dbUser = await User.findOne({
                                    where: { email: currentUser.email }
                                });
                                // If new password = old password
                                if (bcrypt.compareSync(confirmNewPassword, dbUser.password)) {
                                    errors.password = "New password must be different from old password";
                                    throw errors;
                                }
                                else {
                                    // Hash password
                                    const newDBPassword = await bcrypt.hash(confirmNewPassword, 6);
                                    const values = { password: newDBPassword };
                                    const selector = {
                                        where: { email: currentUser.email }
                                    };
                                    const update = await User.update(values, selector);
                                    if (update) {
                                        return {
                                            status: 200,
                                            message: "User's password is updated"
                                        }
                                    }
                                    else {
                                        errors.update = "Failed to update password"
                                        throw errors;
                                    }
                                }
                            }
                            if (currentUser.phone) {
                                const dbUser = await User.findOne({
                                    where: { phone: currentUser.phone }
                                });
                                // If new password = old password
                                if (bcrypt.compareSync(confirmNewPassword, dbUser.password)) {
                                    errors.password = "New password must be different from old password";
                                    throw errors;
                                }
                                else {
                                    // Hash password
                                    const newDBPassword = await bcrypt.hash(confirmNewPassword, 6);
                                    const values = { password: newDBPassword };
                                    const selector = {
                                        where: { phone: currentUser.phone }
                                    };
                                    const update = await User.update(values, selector);
                                    if (update) {
                                        return {
                                            status: 200,
                                            message: "User's password is updated"
                                        }
                                    }
                                    else {
                                        errors.update = "Failed to update password"
                                        throw errors;
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    errors.token = "No token found";
                    throw errors;
                }
            } catch (error) {
                if (error.name === "SequelizeValidationError") {
                    error.errors.forEach(e => (errors[e.path] = e.message));
                }
                throw new UserInputError('Bad input', { errors });
            }
        },
        passwordUpdate: async (parent, args, context, info) => {
            let { currentPassword, newPassword, confirmNewPassword } = args;
            let errors = {};
            let currentUser = null;
            const token = context.req.headers.authorization.split("Bearer ")[1];
            try {
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const expiresAt = new Date(decodedToken.exp * 1000);
                    // Expired token
                    if (new Date() > expiresAt) {
                        errors.token = "Token Expired";
                        throw errors;
                    }
                    else {
                        currentUser = decodedToken;
                        const dbUser = await User.findOne({
                            where: { email: currentUser.email }
                        });
                        if (bcrypt.compareSync(currentPassword, dbUser.password)) {
                            if (newPassword !== confirmNewPassword) {
                                errors.password = "Passwords must match";
                                throw errors;
                            }
                            else {
                                // If new password = old password
                                if (bcrypt.compareSync(confirmNewPassword, dbUser.password)) {
                                    errors.password = "New password must be different from old password";
                                    throw errors;
                                }
                                else {
                                    // Hash password
                                    const newDBPassword = await bcrypt.hash(confirmNewPassword, 6);
                                    const values = { password: newDBPassword };
                                    const selector = {
                                        where: { email: currentUser.email }
                                    };
                                    const update = await User.update(values, selector);
                                    if (update) {
                                        return {
                                            status: 200,
                                            message: "User's password is updated"
                                        }
                                    }
                                    else {
                                        errors.update = "Failed to update password"
                                        throw errors;
                                    }
                                }
                            }
                        }
                        else {
                            errors.password = "Your Password is incorrect";
                            throw errors;
                        }
                    }
                }
                else {
                    errors.token = "No token found";
                    throw errors;
                }
            } catch (error) {
                if (error.name === "SequelizeValidationError") {
                    error.errors.forEach(e => (errors[e.path] = e.message));
                }
                throw new UserInputError('Bad input', { errors });
            }
        },
        deleteProfile: async (parent, args, context, info) => {
            let { password } = args;
            let errors = {};
            let currentUser = null;
            const token = context.req.headers.authorization.split("Bearer ")[1];
            try {
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const expiresAt = new Date(decodedToken.exp * 1000);
                    // Expired token
                    if (new Date() > expiresAt) {
                        errors.token = "Token Expired";
                        throw errors;
                    }
                    else {
                        currentUser = decodedToken;
                        const dbUser = await User.findOne({
                            where: { email: currentUser.email }
                        });
                        if (bcrypt.compareSync(password, dbUser.password)) {
                            const deleteUser = await User.destroy({
                                where: { email: currentUser.email }
                            });
                            if (deleteUser) {
                                return {
                                    status: 200,
                                    message: "User Deleted"
                                }
                            }
                            else {
                                errors.delete = "Failed to delete user";
                                throw errors;
                            }
                        }
                        else {
                            errors.password = "Your Password is incorrect";
                            throw errors;
                        }
                    }
                }
                else {
                    errors.token = "No token found";
                    throw errors;
                }
            } catch (error) {
                if (error.name === "SequelizeValidationError") {
                    error.errors.forEach(e => (errors[e.path] = e.message));
                }
                throw new UserInputError('Bad input', { errors });
            }
        },
        stripeSubmit: async (parent, args, context, info) => {
            const { amount, id } = args;
            let currentUser = null;
            let errors = {};
            const token = context.req.headers.authorization.split("Bearer ")[1];
            try {
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const expiresAt = new Date(decodedToken.exp * 1000);
                    // Expired token
                    if (new Date() > expiresAt) {
                        errors.token = "Token Expired";
                        throw errors;
                    }
                    else {
                        currentUser = decodedToken;
                        const dbUser = await User.findOne({
                            where: { email: currentUser.email }
                        });
                        // Logic for donation
                        const donationStripe = await stripe.paymentIntents.create({
                            amount,
                            currency: "USD",
                            description: "PawUMass Donation",
                            payment_method: id,
                            confirm: true
                        });
                        if (donationStripe) {
                            const donation = dbUser.donation;
                            if (donation === false) {
                                const values = { donation: 1 };
                                const selector = {
                                    where: { email: currentUser.email }
                                };
                                const update = await User.update(values, selector);
                                if (update) {
                                    return {
                                        status: 200,
                                        message: "Successfully donated"
                                    }
                                }
                                else {
                                    errors.donation = "Failed to donate";
                                    throw errors;
                                }
                            }
                            else {
                                errors.donation = "Already donated"
                                throw errors;
                            }
                        }
                        else {
                            errors.donation = "Failed to donate";
                            throw errors;
                        }
                    }
                }
                else {
                    errors.token = "No token found";
                    throw errors;
                }
            } catch (error) {
                if (error.name === "SequelizeValidationError") {
                    error.errors.forEach(e => (errors[e.path] = e.message));
                }
                throw new UserInputError('Bad input', { errors });
            }
        },
        submit: async (parent, args, context, info) => {
            const { petName, breed, description, radio } = args;
            const { filename } = await args.file;
            let currentUser = null;
            let errors = {};
            const token = context.req.headers.authorization.split("Bearer ")[1];
            try {
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const expiresAt = new Date(decodedToken.exp * 1000);
                    // Expired token
                    if (new Date() > expiresAt) {
                        errors.token = "Token Expired";
                        throw errors;
                    }
                    else {
                        // Upload to S3
                        const s3 = await uploadToS3(args.file);
                        if (s3) {
                            currentUser = decodedToken;
                            const dbUser = await User.findOne({
                                where: { email: currentUser.email }
                            });
                            const id = dbUser.id;
                            const email = dbUser.email;
                            const phone = dbUser.phone;
                            const photo = filename;
                            const howLong = radio;
                            const date = new Date();
                            const number = Math.floor(Math.random() * id);
                            const token = jwt.sign({ id: id + number }, JWT_SECRET);
                            const availability = false;
                            // Create assets
                            const create = await Asset.create({
                                email, phone, petName, breed, photo, description, howLong, date, token, availability
                            });
                            if (create) {
                                return {
                                    status: 200,
                                    message: "Asset created"
                                }
                            }
                            else {
                                errors.create = "Failed to create"
                                throw errors;
                            }

                        }
                        else {
                            errors.s3 = "Failed to submit";
                            throw errors;
                        }
                    }
                }
                else {
                    errors.token = "No token found";
                    throw errors;
                }
            } catch (error) {
                if (error.name === "PayloadTooLargeError") {
                    errors.s3 = "Image is too large";
                    throw errors;
                }
            }
        },
        orderCheck: async (parent, args, context, info) => {
            const { token } = args;
            let errors = {};
            let currentUser = null;
            const userToken = context.req.headers.authorization.split("Bearer ")[1];
            try {
                if (userToken) {
                    const decodedToken = jwtDecode(userToken);
                    const expiresAt = new Date(decodedToken.exp * 1000);
                    // Expired token
                    if (new Date() > expiresAt) {
                        errors.token = "Token Expired";
                        throw errors;
                    }
                    else {
                        currentUser = decodedToken;
                        const values = { availability: 1, token: token };
                        const whereInUser = {
                            where: { email: currentUser.email }
                        };
                        const whereInAsset = {
                            where: { token: token }
                        };
                        const user = await User.update(values, whereInUser);
                        const asset = await Asset.update(values, whereInAsset);
                        if (user && asset) {
                            return {
                                status: 200,
                                message: "Updated both"
                            }
                        }
                        else {
                            errors.update = "Failed to update";
                            throw errors;
                        }
                    }
                }
                else {
                    errors.token = "No token found";
                    throw errors;
                }
            } catch (error) {
                if (error.name === "SequelizeValidationError") {
                    error.errors.forEach(e => (errors[e.path] = e.message));
                }
                throw new UserInputError('Bad input', { errors });
            }
        },
        resetOrder: async (parent, args, context, info) => {
            let currentUser = null;
            let errors = {};
            const token = "JmLTEyMy11LTEyMy1jLTEyMy1rLTEyMy15LTEyMy1vLTEyMy11";
            const userToken = context.req.headers.authorization.split("Bearer ")[1];
            try {
                if (userToken) {
                    const decodedToken = jwtDecode(userToken);
                    const expiresAt = new Date(decodedToken.exp * 1000);
                    // Expired token
                    if (new Date() > expiresAt) {
                        errors.token = "Token Expired";
                        throw errors;
                    }
                    else {
                        currentUser = decodedToken;
                        const dbUser = await User.findOne({
                            where: { email: currentUser.email }
                        });
                        const userValues = { availability: 0, token: token };
                        const whereInUser = {
                            where: { email: dbUser.email }
                        };
                        const assetValues = { availability: 0 };
                        const whereInAsset = {
                            where: { token: dbUser.token }
                        };
                        const asset = await Asset.update(assetValues, whereInAsset);
                        const user = await User.update(userValues, whereInUser);
                        if (user && asset) {
                            return {
                                status: 200,
                                message: "Updated both"
                            }
                        }
                        else {
                            errors.update = "Failed to update";
                            throw errors;
                        }
                    }
                }
                else {
                    errors.token = "No token found";
                    throw errors;
                }
            } catch (error) {
                if (error.name === "SequelizeValidationError") {
                    error.errors.forEach(e => (errors[e.path] = e.message));
                }
                throw new UserInputError('Bad input', { errors });
            }
        },
    }
}