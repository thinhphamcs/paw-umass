const mysql = require("mysql");

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

    db.query('SELECT email FROM users-info WHERE email = ?', [email], (err, results) => {
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
        }
    });
    res.send("Form Submitted");
}