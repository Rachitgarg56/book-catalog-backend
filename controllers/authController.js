const UserModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the user already exists
      const userCount = await UserModel.countDocuments();      
      const role = userCount === 0 ? 'admin' : 'user';

      let user = await UserModel.findOne({ email });

      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      user = new UserModel({ username, email, password, role });
  
      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      // Respond with a success message
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
  
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create and return a JWT
      const payload = { userId: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};  

// Get current user info
const getCurrentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const authController = {
    registerUser,
    loginUser,
    getCurrentUser,
}

module.exports = authController;
