// Import require
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Create the database
 * Host can be change with the ip address of server instead of 'localhost'
 * XAMPP by default using 'root' as 'user' and 'empty' as 'password'
 * MAMPP/WAMPP by default using 'root' as 'user' and 'root' as 'password'
 */
const userDB = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

// Connect to database
userDB.connect((err) => {
    if (err) {
        console.log(err); // Should print the error message
    }
    else {
        console.log("MySQL Connected For Users..."); // Should print this message in console to prove it is connected
    }
});

// Export as module
exports.register = async (req, res) => {
    try {
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
        const phoneRE = /^\s*((\+\d{1}))[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})\s*$/;
        // If user provide the correct format which is anystring@anystring.anystring then we will register
        if (emailRE.test(email) && phoneRE.test(phone)) {
            // Look through our database
            userDB.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    // We check the email from database if email exists then 
                    if (results.length > 0) {
                        res.status(403).json({
                            message: 'That email is already in use'
                        });
                    }
                    else {
                        // We check the password from user input with the confirm password from user input
                        if (password !== passwordConfirm) {
                            res.status(403).json({
                                message: 'Passwords do not match'
                            });
                        }
                        else {
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
                            userDB.query('INSERT INTO users SET ?', data, (err, results) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    if (results.length === 0) {
                                        res.status(404).json({
                                            message: 'Nothing got inserted'
                                        });
                                    }
                                    else {
                                        res.status(200).json({
                                            message: 'User Registered'
                                        }); // User registered
                                    }
                                }
                            });
                        }
                    }
                }
            });
        }
        // If the email address format is incorrect
        if (!emailRE.test(email)) {
            res.status(400).json({
                message: "Invalid Email Format"
            });
        }
        if (!phoneRE.test(phone)) {
            res.status(400).json({
                message: "Invalid Phone Format"
            });
        }
    } catch (err) {
        console.log(err);
    }
}

// Export as module
exports.login = async (req, res) => {
    try {
        const { email, password, checkBox } = req.body;

        // Look through our database
        userDB.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                /**
                * If user input nothing or wrong password
                * bcrypt compare user input password and the hashed password in our database
                * since it takes sometimes we have to use await and async
                */
                if (results.length === 0) {
                    res.status(401).json({
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
                            profile: true
                        }); // User logged in
                    }
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

// Export as module
exports.forgot = async (req, res) => {
    try {
        const { email, phone } = req.body;
        // This regular expression will look for @ sign in the email address provided by user
        const emailRE = /\S+@\S+\.\S+/;
        const phoneRE = /^\s*((\+\d{1}))[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})\s*$/;
        // If user input is email format
        if (emailRE.test(email)) {
            // Look through our database
            userDB.query('SELECT id FROM users WHERE email = ?', [email], async (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (results.length === 0) {
                        res.status(401).json({
                            message: 'Email address does not exist '
                        });
                    }
                    else {
                        const id = results.map(item => item.id);
                        const token = jwt.sign({ id: id }, process.env.JWT_SECRET);
                        // Send it back to the front end
                        res.status(200).json({
                            auth: true,
                            token: token,
                            message: 'Authorized Email',
                            forgot: true
                        });
                    }
                }
            });
        }
        else {
            if (phoneRE.test(phone)) {
                // Look through our database
                userDB.query('SELECT id FROM users WHERE phone = ?', [phone], async (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        /**
                         * If user input nothing or wrong password
                        * bcrypt compare user input password and the hashed password in our database
                        * since it takes sometimes we have to use await and async
                        */
                        if (results.length === 0) {
                            res.status(401).json({
                                message: 'Phone number does not exist '
                            });
                        }
                        else {
                            const id = results.map(item => item.id);
                            const token = jwt.sign({ id: id }, process.env.JWT_SECRET);
                            // Send it back to the front end
                            res.status(200).json({
                                auth: true,
                                token: token,
                                message: 'Authorized Phone',
                                forgot: true
                            });
                        }
                    }
                });
            }
            else {
                res.status(401).json({
                    message: 'Please provide valid input'
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
}

// Export as module
exports.change = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;
        // We decode the token to find out what id does this user belong to
        if (jwt.decode(req.headers.authorization)) {
            const id = jwt.decode(req.headers.authorization, { complete: true }).payload.id;
            // We then check if user is authenticated or not
            userDB.query('SELECT password FROM users WHERE id = ?', [id], async (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (newPassword !== confirmPassword) {
                        res.status(403).json({
                            message: 'Passwords do not match'
                        });
                    }
                    else {
                        const userOldPassword = results.map(item => item.password);
                        if (bcrypt.compareSync(newPassword, userOldPassword[0])) {
                            res.status(403).json({
                                message: 'New password must be different from old password'
                            });
                        }
                        else {
                            // Hashing user input password
                            let hashedPassword = await bcrypt.hash(newPassword, 8);
                            userDB.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id], async (err, results) => {
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
                                            auth: false,
                                            message: "Password is Updated"
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            });
        }
        else {
            res.status(404).json({
                message: "Unauthorized User",
            });
        }
    } catch (err) {
        console.log(err);
    }
}