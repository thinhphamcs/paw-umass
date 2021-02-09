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

    // Look through our database
    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            if (results.length > 0) {
                return res.json({
                    message: 'That email is already in use'
                });
            }
            else if (password !== passwordConfirm) {
                return res.json({
                    message: 'Password do not match'
                });
            }
            // Hashing user input password
            let hashedPassword = await bcrypt.hash(password, 8);

            // Insert data to our database
            db.query('INSERT INTO users SET ?', { firstName: firstName, lastName: lastName, email: email, password: hashedPassword, phone: phone }, (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    return res.status(200).json({
                        message: "User Registered"
                    }); // User registered
                }
            });
        }
    });
}

// Export as module
exports.login = async (req, res) => {
    try {
        const { email, password, checkBox } = req.body;
        // If email or password is empty
        if (!email || !password) {
            return res.json({
                auth: false,
                message: 'Please provide an email and password'
            });
        }
        // Look through our database
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            /**
             * If user input nothing or wrong password
             * bcrypt compare user input password and the hashed password in our database
             * since it takes sometimes we have to use await and async
             */
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.json({
                    auth: false,
                    message: 'Email or Password is incorrect'
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
                    checkBox: checkBox
                }); // User logged in
            }
        });
    } catch (err) {
        console.log(err);
    }
}