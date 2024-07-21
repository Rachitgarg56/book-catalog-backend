const BookModel = require('../models/bookModel.js');
const UserModel = require('../models/userModel.js');

const addFavorite = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { bookId } = req.body;
  
      // Find the user by ID
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the book exists
      const book = await BookModel.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      // Check if the book is already in favorites
      if (user.favorites.includes(bookId)) {
        return res.status(400).json({ message: 'Book is already in favorites' });
      }
  
      // Add the book to the user's favorites
      user.favorites.push(bookId);
      await user.save();
  
      res.status(200).json({ message: 'Book added to favorites', user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

// userController.js
const getUserFavorites = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId)
      .populate('favorites')
      .exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const userController = {
    addFavorite,
    getUserFavorites,
}

module.exports = userController;
