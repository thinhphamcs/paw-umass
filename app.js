// Import require
const express = require("express"); // Start server from nodejs
const mysql = require("mysql"); // For MySQL database
const dotenv = require("dotenv"); // For more secure way to connect to database

/**
 * Tell dotenv where is the variables I want
 * ./ means the same directory
 * The file .env can be name anything such as password.env or stuff.env
 */
dotenv.config({
    path: './.env',
});

// Start server with this "app"
const app = express();

/**
 * Create the database
 * Host can be change with the ip address of server instead of 'localhost'
 * XAMPP by default using 'root' as 'user' and 'empty' as 'password'
 * MAMPP/WAMPP by default using 'root' as 'user' and 'root' as 'password'
 */
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.log(err); // Should print the error message
    }
    else {
        console.log("MySQL Connected..."); // Should print this message in console to prove it is connected
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
