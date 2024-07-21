const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { verifyToken, authorizeRole } = require('../middlewares/auth.js');

// Route to add a book to user's favorite list

router.post('/favorites', verifyToken, userController.addFavorite);

router.get('/:userId/favorites', verifyToken, userController.getUserFavorites);

module.exports = router;
