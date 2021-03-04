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

exports.profile = (req, res) => {
    if (jwt.decode(req.headers.authorization)) {
        res.status(200).json({
            auth: true,
            message: "Authorized User",
        });
    }
    else {
        res.status(401).json({
            auth: false,
            message: "Unauthorized User",
        });
    }
}