const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate role
    const validRoles = ['admin', 'team_member'];
    if (!validRoles.includes(role)) {
      return res.status(400).send('Invalid role');
    }
    
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      res.status(400).send('Username already exists');
    } else {
      console.error('Server error:', error); // Log the error for debugging
      res.status(500).send('Server error');
    }
  }
};



// Login a user and return a JWT
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  // Sign a JWT token
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'default_secret_key', { expiresIn: '24h' });
  const { password: _, ...userWithoutPassword } = user.toObject();
     
  res.json({ token, user: userWithoutPassword });
};

module.exports = { register, login };
