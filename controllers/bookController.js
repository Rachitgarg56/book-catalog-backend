const BookModel = require('../models/bookModel.js');

const getBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchBooks = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const books = await BookModel.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } },
        { genre: { $regex: searchTerm, $options: 'i' } }
      ]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBook = async (req, res) => {
  const book = new BookModel({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    publishedYear: req.body.publishedYear,
    genre: req.body.genre,
    coverImage: req.body.coverImage,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the book already exists in favorites
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

const bookController = {
    getBooks,
    searchBooks,
    addBook,
    addFavorite,
}

module.exports = bookController;
