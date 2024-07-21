const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel.js'); // Assuming the user model is in models/User.js

const verifyToken = async (req, res, next) => {
  const token = req.header('x-auth-token');

  // 1. Token should be present
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // 2. Secret key validation
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Token expiry date should not be passed
    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    // 4. Validate the issued at date (Optional)
    // if (decoded.iat) {
    //   const issuedAt = new Date(decoded.iat * 1000);
    //   // Perform any additional validation on the issuedAt date if necessary
    // }

    // 5. Validate the user ID if it is present in the database
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user to the request object
    req.user = { ...decoded, role: user.role };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ message: 'Access forbidden' });
    next();
  };
};

//attaches userIdObject using token 
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken, authorizeRole, authMiddleware };
