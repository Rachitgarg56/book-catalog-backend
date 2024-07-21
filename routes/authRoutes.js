const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const auth = require('../middlewares/auth.js');

// Register a new user
router.post('/register', authController.registerUser);

// Login a user
router.post('/login', authController.loginUser);

// Get current user info
router.get('/me', auth.authMiddleware, authController.getCurrentUser);

module.exports = router;
