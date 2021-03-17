// Import require
const express = require("express"); // Start server from nodejs
const mysql = require("mysql"); // For MySQL database
const dotenv = require("dotenv"); // For more secure way to connect to database
const path = require("path"); // Default with nodejs so no need to install but do need to require
const cookieParser = require("cookie-parser"); // To enable cookie in browser
const bodyParser = require('body-parser'); // To enable body-parser
const cors = require("cors"); // To enable cors

/**
 * Tell dotenv where are the environment setting variables
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

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json({ extended: false }));
// Enable Cookie-parser in browser
app.use(cookieParser());
// Using body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*// Using cors
/*
origin: 'http://localhost:3000/',
    credentials: true,            //access-control-allow-credentials:true
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
    optionSuccessStatus: 200
*/
const corsOptions = {
    origin: "*", // This is very bad due to everyone can access figure out a way to stop this
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false, // It works for profile if it is false
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions)); // Making sure cors using those options above

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
app.use('/auth', require('./routes/auth'));
app.use('/settings', require('./routes/settings'));

// Tell express which port to listen
app.listen(process.env.PORT || 5050, () => {
    console.log("Server started on port " + process.env.PORT || 5050);
});
