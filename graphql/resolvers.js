const { User, Asset } = require('../models');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { JWT_SECRET, STRIPE_SECRET_TEST } = require('../config/env.json');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const stripe = require("stripe")(STRIPE_SECRET_TEST);
const path = require('path');
const fs = require('fs');
// const { upload, getFileStream } = require('../s3');
const { uploadToS3, getObjectFromS3 } = require('../s3');
const asset = require('../models/asset');
// const user = require('../models/user');
// const { Op } = require("sequelize");

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

                const users = await User.findOne({
                    where: { email: user.email }
                });
                return users;
            } catch (error) {
                console.log(error);
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
                    throw new UserInputError('user not found', { errors });
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
                console.log(error);
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
                        throw new UserInputError('user not found', { errors });
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
                        throw new UserInputError('user not found', { errors });
                    }
                    else {
                        const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: '1h' });
                        user.token = token;
                        return user;
                    }
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        },










        getAssets: async (parent, args, context, info) => {
            try {
                let errors = {};
                const assets = await Asset.findAll();
                if (assets) {
                    return assets;
                }
                else {
                    errors.message = "Assets no longer exist";
                }
                if (Object.keys(errors).length > 0) {
                    throw errors;
                }
            } catch (error) {
                console.log(error);
                throw error;
            }

        },

        getImages: async (parent, args, context, info) => {
            try {
                // const data = await getObjectFromS3('11.jpg');
                // console.log(data.Body.toString('base64'));
                // const readStream = await getFileStream('1.jpg');
                // const testing = readStream.Body.toString('base64');
                // console.log(testing);
                // console.log(url);
                // assets.map(async (value, index) => {
                //     const readStream = await getFileStream(value.photo);
                //     if (readStream) {
                //         url.push(readStream.Body);
                //     }

                // });
                // console.log(url);
                // return url;

            } catch (error) {
                console.log(error);
                throw error;
            }
        },







    },
    Mutation: {
        register: async (parent, args, context, info) => {
            let { firstName, lastName, email, password, confirmPassword, phone } = args;
            const donation = false, availability = false;
            let errors = {}
            try {
                // Validate input data 
                if (password !== confirmPassword) {
                    errors.confirmPassword = "Passwords must match";
                }

                if (Object.keys(errors).length > 0) {
                    throw errors;
                }

                // Hash password
                password = await bcrypt.hash(password, 6);

                // Create user
                const user = await User.create({
                    firstName, lastName, email, password, phone, donation, availability
                })

                // Return user
                // .toJSON() but no need since returning sequelize instance it automatic converts to json
                // But required if use let say ...user.toJSON()
                // Date can be user.date.toISOString()
                return user;
            } catch (error) {
                console.log(error);
                if (error.name === "SequelizeUniqueConstraintError") {
                    error.errors.forEach(e => (errors[e.path.split(".")[1]] = `Email is already taken`));
                }
                else if (error.name === "SequelizeValidationError") {
                    error.errors.forEach(e => (errors[e.path] = e.message));
                }
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
                    }
                    else {
                        user = decodedToken;
                        // If first name only case
                        if (firstName && !lastName && !email && !phone) {
                            const values = { firstName: firstName };
                            const selector = {
                                where: { email: user.email }
                            };
                            await User.update(values, selector);
                        }
                        // If last name only case
                        if (lastName && !firstName && !email && !phone) {
                            const values = { lastName: lastName };
                            const selector = {
                                where: { email: user.email }
                            };
                            await User.update(values, selector);
                        }
                        // If email field only case
                        if (email && !firstName && !lastName && !phone) {
                            const values = { email: email };
                            const selector = {
                                where: { email: user.email }
                            };
                            await User.update(values, selector);
                        }
                        // If phone field only case
                        if (phone && !firstName && !lastName && !email) {
                            if (phone.length > 12 || phone.length < 12) {
                                errors.phone = "Must be a valid phone number"
                            }
                            else if (phone.length === 12) {
                                const values = { phone: phone };
                                const selector = {
                                    where: { email: user.email }
                                };
                                await User.update(values, selector);
                            }
                        }
                        // If everything only case
                        if (firstName && lastName && email && phone) {
                            const values = { firstName: firstName, lastName: lastName, email: email, phone: phone };
                            const selector = {
                                where: { email: user.email }
                            };
                            await User.update(values, selector);
                        }

                        if (Object.keys(errors).length > 0) {
                            throw errors;
                        }
                    }
                    // return user;
                }
                else {
                    console.log("No token found");
                }
            } catch (error) {
                // if (error.name === "SequelizeUniqueConstraintError") {
                //     error.errors.forEach(e => (errors[e.path.split(".")[1]] = `Email is already taken`));
                // }
                // else
                if (error.name === "SequelizeValidationError") {
                    error.errors.forEach(e => (errors[e.path] = e.message));
                }
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
                    }
                    else {
                        // If password do not match
                        if (newPassword !== confirmNewPassword) {
                            errors.password = "Passwords must match";
                        }
                        else {
                            currentUser = decodedToken;
                            if (currentUser.email) {
                                const databaseUser = await User.findOne({
                                    where: { email: currentUser.email }
                                });
                                // If new password = old password
                                if (bcrypt.compareSync(confirmNewPassword, databaseUser.password)) {
                                    errors.password = "New password must be different from old password";
                                }
                                else {
                                    // Hash password
                                    const newDatabasePassword = await bcrypt.hash(confirmNewPassword, 6);
                                    const values = { password: newDatabasePassword };
                                    const selector = {
                                        where: { email: currentUser.email }
                                    };
                                    await User.update(values, selector);
                                }
                            }
                            if (currentUser.phone) {
                                const databaseUser = await User.findOne({
                                    where: { phone: currentUser.phone }
                                });
                                // If new password = old password
                                if (bcrypt.compareSync(confirmNewPassword, databaseUser.password)) {
                                    errors.password = "New password must be different from old password";
                                }
                                else {
                                    // Hash password
                                    const newDatabasePassword = await bcrypt.hash(confirmNewPassword, 6);
                                    const values = { password: newDatabasePassword };
                                    const selector = {
                                        where: { phone: currentUser.phone }
                                    };
                                    await User.update(values, selector);
                                }
                            }
                        }
                        if (Object.keys(errors).length > 0) {
                            throw errors;
                        }
                    }
                }
                else {
                    console.log("No token found");
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
                    }
                    else {
                        currentUser = decodedToken;
                        const databaseUser = await User.findOne({
                            where: { email: currentUser.email }
                        });
                        if (bcrypt.compareSync(currentPassword, databaseUser.password)) {
                            if (newPassword !== confirmNewPassword) {
                                errors.password = "Passwords must match";
                            }
                            else {
                                // If new password = old password
                                if (bcrypt.compareSync(confirmNewPassword, databaseUser.password)) {
                                    errors.password = "New password must be different from old password";
                                }
                                else {
                                    // Hash password
                                    const newDatabasePassword = await bcrypt.hash(confirmNewPassword, 6);
                                    const values = { password: newDatabasePassword };
                                    const selector = {
                                        where: { email: currentUser.email }
                                    };
                                    await User.update(values, selector);
                                }
                            }
                        }
                        else {
                            errors.password = "Your Password is incorrect";
                        }
                        if (Object.keys(errors).length > 0) {
                            throw errors;
                        }
                    }
                }
                else {
                    console.log("No token found");
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
                    }
                    else {
                        currentUser = decodedToken;
                        const databaseUser = await User.findOne({
                            where: { email: currentUser.email }
                        });
                        if (bcrypt.compareSync(password, databaseUser.password)) {
                            await User.destroy({
                                where: { email: currentUser.email }
                            });
                        }
                        else {
                            errors.password = "Your Password is incorrect";
                        }
                        if (Object.keys(errors).length > 0) {
                            throw errors;
                        }
                    }
                }
                else {
                    console.log("No token found");
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
            const token = context.req.headers.authorization.split("Bearer ")[1];
            try {
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const expiresAt = new Date(decodedToken.exp * 1000);
                    // Expired token
                    if (new Date() > expiresAt) {
                        errors.token = "Token Expired";
                    }
                    else {
                        currentUser = decodedToken;
                        const databaseUser = await User.findOne({
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
                        const donation = databaseUser.donation;
                        if (donation === false) {
                            const values = { donation: 1 };
                            const selector = {
                                where: { email: currentUser.email }
                            };
                            await User.update(values, selector);
                        }
                    }
                }
                else {
                    console.log("No token found");
                }
            } catch (error) {
                console.log(error);
            }
        },
        submit: async (parent, args, context, info) => {
            const { petName, breed, description, radio } = args;
            const { filename } = await args.file;
            let currentUser = null;
            const token = context.req.headers.authorization.split("Bearer ")[1];
            try {
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const expiresAt = new Date(decodedToken.exp * 1000);
                    // Expired token
                    if (new Date() > expiresAt) {
                        throw new Error("Token Expired");
                    }
                    else {
                        currentUser = decodedToken;
                        const databaseUser = await User.findOne({
                            where: { email: currentUser.email }
                        });
                        const id = databaseUser.id;
                        const email = databaseUser.email;
                        const phone = databaseUser.phone;
                        const photo = filename;
                        const howLong = radio;
                        const date = new Date();
                        const number = Math.floor(Math.random() * id);
                        const token = jwt.sign({ id: id + number }, JWT_SECRET);
                        const availability = false;
                        // Create assets
                        const asset = await Asset.create({
                            email, phone, petName, breed, photo, description, howLong, date, token, availability
                        });
                        const s3 = await uploadToS3(args.file);
                        if (asset && s3) {
                            return {
                                url: 'SUCCESS'
                            }
                        }
                        else {
                            throw new Error("FAILED TO SUBMIT");
                        }
                    }
                }
                else {
                    throw new Error("No Token Found");
                }
            } catch (error) {
                throw new Error(error);
            }
        },
    }
}