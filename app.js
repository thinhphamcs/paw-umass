// Import require
const express = require("express"); // Start server from nodejs
const mysql = require("mysql");

// Start server with this "app"
const app = express();

/**
 * Create the database
 * Host can be change with the ip address of server instead of 'localhost'
 * XAMPP by default using 'root' as 'user' and 'empty' as 'password'
 * MAMPP/WAMPP by default using 'root' as 'user' and 'root' as 'password'
 */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs-login'
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("MySQL Connected...");
    }
});

// APIs
app.get("/", (req, res) => {
    res.send("<h1> Home Page </h1>");
});

// Tell express which port to listen
app.listen("5050", () => {
    console.log("Server started on port 5050");
});
