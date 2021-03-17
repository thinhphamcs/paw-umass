// Import require
const express = require("express");
const settingsController = require("../controllers/settings");
const router = express.Router();

// Define routes
router.get('/profile', settingsController.profile);
router.post('/update', settingsController.update);
router.post('/deactivate', settingsController.delete);
router.post('/change', settingsController.change);

// Export it as module
module.exports = router;