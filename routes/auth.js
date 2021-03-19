// Import require
const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

// Define routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot', authController.forgot);
router.post('/change', authController.change);

// Export it as module
module.exports = router;