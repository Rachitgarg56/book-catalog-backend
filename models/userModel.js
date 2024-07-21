const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'books' }]
});
 
const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
