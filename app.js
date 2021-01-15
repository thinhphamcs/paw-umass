// Require
const express = require("express"); // Start server from nodejs
const app = express(); // Start server with this "app"

// Start the server
app.get("/", (req, res) => {
    res.send("<h1> Home Page </h1>");
});

// Tell express which port to listen
app.listen("5050", () => {
    console.log("Server started on port 5050");
});
