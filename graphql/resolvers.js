const { User } = require('../models');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { JWT_SECRET } = require('../config/env.json');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
        }
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
        }
    }
}