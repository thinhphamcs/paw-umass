// Import require
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Connect to database again
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_ASSET
});

// Export as module
exports.submit = async (req, res) => {
    try {
        console.log("hello");
    } catch (err) {
        console.log(err);
    }
}