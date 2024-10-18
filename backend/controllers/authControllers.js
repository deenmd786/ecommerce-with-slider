const User = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign Up
const registerUser = async (req, res) => {
  const { name, email, password, profilePic } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ name, email, password, profilePic });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User Not Exist!!' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Password not Match!!!' });
      }
  
      // Create token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send token in cookie
      res.cookie('token', token, {
        httpOnly: true, // Secure cookie
        sameSite: 'strict', // Optional, for CSRF protection
        maxAge: 60 * 60 * 1000, // 1 hour expiry
      });
  
      // Optionally, send user info in the response
      res.json({token, user: {user} });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Dashboard (Fetch user data)
const getUserData = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Log Out
const logoutUser = async (req, res) => {
  try {
    // Clear the 'token' cookie
    res.clearCookie('token');
    
    // Send success message
    res.status(200).json({ user: [], message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

  module.exports = { registerUser, loginUser, getUserData, logoutUser };

  