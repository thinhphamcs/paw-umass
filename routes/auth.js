// Import require
const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

// Define routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Export it as module
module.exports = router;