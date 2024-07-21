const express = require('express');
const bookController = require('../controllers/bookController');
const { authorizeRole, verifyToken } = require('../middlewares/auth');
const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/search', bookController.searchBooks);
router.post('/add', verifyToken, authorizeRole('admin'), bookController.addBook);
router.post('/favorites', bookController.addFavorite);

module.exports = router;
