// Import require
const express = require("express");
const router = express.Router();

/**
 * Define routes
 */
router.get('/', (req, res) => {
    res.render('home');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

// Export it as module
module.exports = router;