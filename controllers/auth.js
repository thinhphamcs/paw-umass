// Import require
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Connect to database again
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

// Export as modules
exports.register = (req, res) => {
    /**
     * Better way to write this 
     * const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const passwordConfirm = req.body.passwordConfirm;
        const phone = req.body.phone;
     */
    const { firstName, lastName, email, password, passwordConfirm, phone } = req.body;

    // This regular expression will look for @ sign in the email address provided by user
    const emailRE = /\S+@\S+\.\S+/;
    const phoneRE = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
    // If user provide the correct format which is anystring@anystring.anystring then we will register
    if (emailRE.test(email) && phoneRE.test(phone)) {
        // Look through our database
        db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                // We check the email from database if email exists then 
                if (results.length > 0) {
                    return res.status(403).json({
                        message: 'That email is already in use'
                    });
                }
                // We check the password from user input with the confirm password from user input
                else if (password !== passwordConfirm) {
                    return res.status(403).json({
                        message: 'Password do not match'
                    });
                }
                // Hashing user input password
                let hashedPassword = await bcrypt.hash(password, 8);
                // This way is better to prevent SQL injection
                let data = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                    phone: phone
                };
                // Insert data to our database
                db.query('INSERT INTO users SET ?', data, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        return res.status(200).json({
                            message: 'User Registered'
                        }); // User registered
                    }
                });
            }
        });
    }
    // If the email address format is incorrect
    if (!emailRE.test(email)) {
        return res.status(400).json({
            message: "Invalid Email Format"
        });
    }
    if (!phoneRE.test(phone)) {
        return res.status(400).json({
            message: "Invalid Phone Format"
        });
    }
}

// Export as module
exports.login = async (req, res) => {
    try {
        const { email, password, checkBox } = req.body;
        // If email or password is empty
        if (!email || !password) {
            return res.status(204).json({
                message: 'Please provide valid email or password'
            });
        }
        // Look through our database
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            /**
             * If user input nothing or wrong password
             * bcrypt compare user input password and the hashed password in our database
             * since it takes sometimes we have to use await and async
             */
            if (results.length === 0) {
                return res.status(401).json({
                    message: 'Please provide valid email or password'
                });
            }
            else {
                if (!results || !(await bcrypt.compare(password, results[0].password))) {
                    res.status(401).json({
                        message: 'Please provide valid email or password'
                    });
                }
                else {
                    // Getting our id from database since each user will have a unique id
                    const id = results[0].id;
                    /**
                     * Create token through jsonwebtoken by sign function with id as param
                     * We need a secret password and when it should be expire
                     */
                    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });
                    /**
                     * Create cookie to enable it through html
                     * the way it expires we need to convert it to miliseconds
                     * so Today + How many days it expires (3 days) * 24 hours a day * 60 minutes per hour * 60 seconds per minute and 1000 miliseconds per second
                     */
                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true,
                    }
                    res.cookie('jwt', token, cookieOptions); // Here is where we create the cookie
                    // Send it back to the front end
                    res.status(200).json({
                        auth: true,
                        token: token,
                        checkBox: checkBox,
                        data: {
                            "firstName": results.map(item => item.firstName),
                            "lastName": results.map(item => item.lastName),
                            "email": results.map(item => item.email),
                            "phone": results.map(item => item.phone)
                        }
                    }); // User logged in
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

// Export as module
exports.profile = async (req, res) => {
    // Get data from users with the following fields
    const { firstName, lastName, email, phone } = req.body;
    // Decode the token to get the user's ID
    const id = jwt.decode(req.headers.authorization, { complete: true }).payload.id;
    // This regular expression will look for @ sign in the email address provided by user
    const emailRE = /\S+@\S+\.\S+/;
    const phoneRE = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
    // We now check if user have any data, if so then we update that specific data
    // If first name only case
    if (firstName && !lastName && !email && !phone) {
        console.log("first");
        db.query('UPDATE users SET firstName = ? WHERE id = ?', [firstName, id], async (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                if (results.length === 0) {
                    res.status(404).json({
                        message: "Data is Missing"
                    });
                }
                else {
                    res.status(200).json({
                        message: "Data is Updated",
                        firstName: firstName
                    });

                }
            }
        });
    }
    // If last name only case
    if (lastName && !firstName && !email && !phone) {
        console.log("last");
        db.query('UPDATE users SET lastName = ? WHERE id = ?', [lastName, id], async (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                if (results.length === 0) {
                    res.status(404).json({
                        message: "Data is Missing"
                    });
                }
                else {
                    res.status(200).json({
                        message: "Data is Updated",
                        lastName: lastName

                    });
                }
            }
        });
    }
    // If email field only case
    if (email && !firstName && !lastName && !phone) {
        console.log("email");
        if (emailRE.test(email)) {
            db.query('UPDATE users SET email = ? WHERE id = ?', [email, id], async (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (results.length === 0) {
                        res.status(404).json({
                            message: "Data is Missing"
                        });
                    }
                    else {
                        res.status(200).json({
                            message: "Data is Updated",
                            email: email
                        });
                    }
                }
            });
        }
        else {
            return res.status(400).json({
                message: "Invalid Email Format"
            });
        }
    }
    // If phone field only case
    if (phone && !firstName && !lastName && !email) {
        console.log("phone");
        if (phoneRE.test(phone)) {
            db.query('UPDATE users SET phone = ? WHERE id = ?', [phone, id], async (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (results.length === 0) {
                        res.status(404).json({
                            message: "Data is Missing"
                        });
                    }
                    else {
                        res.status(200).json({
                            message: "Data is Updated",
                            phone: phone
                        });
                    }
                }
            });
        }
        else {
            return res.status(400).json({
                message: "Invalid Phone Format"
            });
        }
    }
    // If everything only case
    if (firstName && lastName && email && phone) {
        console.log("hey im here");
        db.query('UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?  WHERE id = ?', [firstName, lastName, email, phone, id], async (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                if (results.length === 0) {
                    res.status(404).json({
                        message: "Data is Missing"
                    });
                }
                else {
                    res.status(200).json({
                        message: "Data is Updated",
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phone: phone
                    });

                }
            }
        });
    }
}
