// Import require
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
// I have to import it again due to I didn't use the router like /auth/ path did
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: './.env',
});

// Connect to database again
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});


exports.profile = (req, res) => {
    if (jwt.decode(req.headers.authorization)) {
        const id = jwt.decode(req.headers.authorization, { complete: true }).payload.id;
        // console.log(id);
        // console.log(db.query('SELECT * FROM users WHERE email = ?', ['testing@email.com']));
        db.query('SELECT * FROM users WHERE id = ?', [id], async (err, results) => {
            if (results.length === 0) {
                return res.status(401).json({
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
                    }
                });
            }
        });
    }
    else {
        res.status(401).json({
            auth: false,
            message: "Unauthorized User",
        });
    }
}