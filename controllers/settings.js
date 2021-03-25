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

// Export as module
exports.profile = async (req, res) => {
    try {
        // We decode the token to find out what id does this user belong to
        if (jwt.decode(req.headers.authorization)) {
            const id = jwt.decode(req.headers.authorization, { complete: true }).payload.id;
            // We then check if user is authenticated or not
            db.query('SELECT firstName, lastName, email, phone FROM users WHERE id = ?', [id], async (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (results.length === 0) {
                        res.status(404).json({
                            auth: false,
                            message: 'User no longer exists'
                        });
                    }
                    else {
                        res.status(200).json({
                            auth: true,
                            message: "Authorized User",
                            data: {
                                "firstName": results.map(item => item.firstName),
                                "lastName": results.map(item => item.lastName),
                                "email": results.map(item => item.email),
                                "phone": results.map(item => item.phone)
                            },
                        });
                    }
                }
            });
        }
        else {
            res.status(404).json({
                auth: false,
                message: "Unauthorized User",
            });
        }
    } catch (err) {
        console.log(err);
    }
}

// Export as module
exports.update = async (req, res) => {
    try {
        // Get data from users with the following fields
        const { firstName, lastName, email, phone } = req.body;
        // Decode the token to get the user's ID
        const id = jwt.decode(req.headers.authorization, { complete: true }).payload.id;
        // This regular expression will look for @ sign in the email address provided by user
        const emailRE = /\S+@\S+\.\S+/;
        const phoneRE = /^\s*((\+\d{1}))[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})\s*$/;
        // We now check if user have any data, if so then we update that specific data
        // If first name only case
        if (firstName && !lastName && !email && !phone) {
            db.query('UPDATE users SET firstName = ? WHERE id = ?', [firstName, id], async (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (results.length === 0) {
                        res.status(404).json({
                            message: "First name is missing"
                        });
                    }
                    else {
                        res.status(200).json({
                            message: "Data is Updated",
                            firstName: firstName,
                            profile: true
                        });
                    }
                }
            });
        }
        // If last name only case
        if (lastName && !firstName && !email && !phone) {
            db.query('UPDATE users SET lastName = ? WHERE id = ?', [lastName, id], async (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (results.length === 0) {
                        res.status(404).json({
                            message: "Last name is missing"
                        });
                    }
                    else {
                        res.status(200).json({
                            message: "Data is Updated",
                            lastName: lastName,
                            profile: true
                        });
                    }
                }
            });
        }
        // If email field only case
        if (email && !firstName && !lastName && !phone) {
            if (emailRE.test(email)) {
                db.query('UPDATE users SET email = ? WHERE id = ?', [email, id], async (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (results.length === 0) {
                            res.status(404).json({
                                message: "Email is missing"
                            });
                        }
                        else {
                            res.status(200).json({
                                message: "Data is Updated",
                                email: email,
                                profile: true
                            });
                        }
                    }
                });
            }
            else {
                res.status(400).json({
                    message: "Invalid Email Format"
                });
            }
        }
        // If phone field only case
        if (phone && !firstName && !lastName && !email) {
            if (phoneRE.test(phone)) {
                db.query('UPDATE users SET phone = ? WHERE id = ?', [phone, id], async (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (results.length === 0) {
                            res.status(404).json({
                                message: "Phone is missing"
                            });
                        }
                        else {
                            res.status(200).json({
                                message: "Data is Updated",
                                phone: phone,
                                profile: true
                            });
                        }
                    }
                });
            }
            else {
                if (!phoneRE.test(phone)) {
                    res.status(400).json({
                        message: "Invalid Phone Format"
                    });
                }
            }
        }
        // If everything only case
        if (firstName && lastName && email && phone) {
            if (emailRE.test(email) && phoneRE.test(phone)) {
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
                                phone: phone,
                                profile: true
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
exports.delete = async (req, res) => {
    try {
        // We decode the token to find out what id does this user belong to
        if (jwt.decode(req.headers.authorization)) {
            const id = jwt.decode(req.headers.authorization, { complete: true }).payload.id;
            // We then check if user is authenticated or not
            db.query('SELECT password FROM users WHERE id = ?', [id], async (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    // We then check for password from user input and db password
                    const userPassword = results.map(item => item.password);
                    const userInputPassword = req.body.password;
                    if (bcrypt.compareSync(userInputPassword, userPassword[0])) {
                        db.query('DELETE FROM users WHERE id = ?', [id], async (err, results) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.status(404).json({
                                    auth: false,
                                    message: "User Deleted"
                                });
                            }
                        });
                    }
                    else {
                        res.status(401).json({
                            message: 'Your Password is incorrect'
                        });
                    }
                }
            });
        }
        else {
            res.status(404).json({
                auth: false,
                message: "Unauthorized User",
            });
        }
    } catch (err) {
        console.log(err);
    }
}

// Export as module
exports.change = async (req, res) => {
    try {
        const { current, newPassword, confirmPassword } = req.body;
        // We decode the token to find out what id does this user belong to
        if (jwt.decode(req.headers.authorization)) {
            const id = jwt.decode(req.headers.authorization, { complete: true }).payload.id;
            // We then check if user is authenticated or not
            db.query('SELECT password FROM users WHERE id = ?', [id], async (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    // We then check for password from user input and db password
                    const userPassword = results.map(item => item.password);
                    if (bcrypt.compareSync(current, userPassword[0])) {
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
                                db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id], async (err, results) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        if (results.length === 0) {
                                            res.status(404).json({
                                                message: "Password does not update"
                                            });
                                        }
                                        else {
                                            res.status(200).json({
                                                auth: true,
                                                message: "Password is Updated",
                                                profile: true
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    }
                    else {
                        res.status(401).json({
                            message: 'Your Password is incorrect'
                        });
                    }
                }
            });
        }
        else {
            res.status(404).json({
                auth: false,
                message: "Unauthorized User",
            });
        }
    } catch (err) {
        console.log(err);
    }
}
