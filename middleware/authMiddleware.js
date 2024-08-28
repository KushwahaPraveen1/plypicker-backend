const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to check JWT token
const authMiddleware = async (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    req.user = await User.findById(decoded.id);
    
    if (!req.user) return res.status(401).send('Invalid Token');

    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = authMiddleware;
