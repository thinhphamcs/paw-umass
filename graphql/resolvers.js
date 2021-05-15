const { User } = require('../models');
const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.findAll()
                return users;
            } catch (error) {
                console.log(error);
            }
        },
    },
    Mutation: {
        register: async (parent, args, context, info) => {
            let { firstName, lastName, email, password, confirmPassword, phone } = args;
            let errors = {}
            try {
                // Validate input data
                if (firstName.trim() === '') {
                    errors.firstName = "First name must not be empty";
                }
                if (lastName.trim() === '') {
                    errors.lastName = "Last name must not be empty";
                }
                if (email.trim() === '') {
                    errors.email = "Email must not be empty";
                }
                if (password.trim() === '') {
                    errors.password = "Password must not be empty";
                }
                if (confirmPassword.trim() === '') {
                    errors.confirmPassword = "Confirm Password must not be empty";
                }
                if (phone.trim() === '') {
                    errors.phone = "Phone must not be empty";
                }
                if (password !== confirmPassword) {
                    errors.confirmPassword = "Passwords must match";
                }

                // Check if email already exists
                // const userByEmail = await User.findOne({ where: { email } });

                // if (userByEmail) {
                //     errors.email = "Email already exists"
                // }

                if (Object.keys(errors).length > 0) {
                    throw errors;
                }
                // Hash password
                password = await bcrypt.hash(password, 6);
                // Create user
                const user = await User.create({
                    firstName, lastName, email, password, phone
                })

                // Return user
                return user; // .toJSON() but no need since returning sequelize instance it automatic converts to json
            } catch (error) {
                console.log(error);
                if (error.name === "SequelizeUniqueConstraintError") {
                    error.errors.forEach(e => (errors[e.value] = `${e.value} is already taken`));
                }
                else if (error.name === "SequelizeValidationError") {
                    error.errors.forEach(e => (errors[e.value] = e.message));
                }
                throw new UserInputError('Bad input', { errors });
            }
        }
    }
}