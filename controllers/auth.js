const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

exports.register = (req, res) => {
    console.log(req.body);

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

    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            if (results.length > 0) {
                return res.render('register', {
                    message: 'That email is already in use'
                });
            }
            else if (password !== passwordConfirm) {
                return res.render('register', {
                    message: 'Password do not match'
                });
            }

            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);

            db.query('INSERT INTO users SET ?', { firstName: firstName, lastName: lastName, email: email, password: hashedPassword, phone: phone }, (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(results);
                    return res.render('register', {
                        message: 'User Registered'
                    });
                }
            });
        }
    });
}