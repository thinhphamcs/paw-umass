// Import require
const express = require("express"); // Start server from nodejs
const mysql = require("mysql"); // For MySQL database
const dotenv = require("dotenv"); // For more secure way to connect to database
const path = require("path"); // Default with nodejs so no need to install but do need to require
const cookieParser = require("cookie-parser"); // To enable cookie in browser

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

/**
 * Where I want to define my css and js files/directory
 * Make sure express.server is using these files/directory
 * Then set it through view engine
 */
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory)); // static is for static file such ass .css or .js
app.set('view engine', 'hbs'); // View engine

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// Enable Cookie-parser in browser
app.use(cookieParser());

// Connect to database
db.connect((err) => {
    if (err) {
        console.log(err); // Should print the error message
    }
    else {
        console.log("MySQL Connected..."); // Should print this message in console to prove it is connected
    }
});

// Define routes
app.use('/', require('./routes/apis'));
app.use('/auth', require('./routes/auth'));

// Tell express which port to listen
app.listen(process.env.PORT || 5050, () => {
    console.log("Server started on port " + process.env.PORT || 5050);
});
