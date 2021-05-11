// Import require
const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

// Define routes
router.post('/submit', userController.submit);
router.post('/donate', userController.donate);

// Export it as module
module.exports = router;