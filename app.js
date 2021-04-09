// Import require
const express = require("express"); // Start server from nodejs
const mysql = require("mysql"); // For MySQL database
const dotenv = require("dotenv"); // For more secure way to connect to database
const path = require("path"); // Default with nodejs so no need to install but do need to require
const cookieParser = require("cookie-parser"); // To enable cookie in browser
const bodyParser = require("body-parser"); // To enable body-parser
const cors = require("cors"); // To enable cors
const fileUpload = require('express-fileupload');

/**
 * Tell dotenv where are the environment setting variables
 * ./ means the same directory
 * The file .env can be name anything such as password.env or stuff.env
 */
dotenv.config({
    path: './.env',
});

/**
 * Start server with this "app"
 * Using fileUpload
 * app.use("/static", express.static("uploads")); // This will allow me to see images as an endpoint
 * Another way to display through static, not sure if I need this
 * Parse URL-encoded bodies (as sent by HTML forms)
 * Parse JSON bodies (as sent by API clients)
 * Enable Cookie-parser in browser
 */
const app = express();
app.use(fileUpload()); // Can be use like this to add options fileUpload({})
app.use("/static", express.static("uploads")); // This will allow me to see images as an endpoint
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cookieParser());

/**
 * Using cors
 *  origin: 'http://localhost:3000/',
    credentials: true, //access-control-allow-credentials:true
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

// Define routes
app.use('/auth', require('./routes/auth'));
app.use('/settings', require('./routes/settings'));
app.use('/user', require('./routes/user'));

// Tell express which port to listen
app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
});
