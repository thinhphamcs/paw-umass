// Import require
const express = require("express");
const userController = require("../controllers/user");
const fileupload = require("express-fileupload");
const router = express.Router();

// Define routes
router.post('/submit', fileupload, userController.submit);

// Export it as module
module.exports = router;