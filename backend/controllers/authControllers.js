const User = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign Up
const registerUser = async (req, res) => {
  const { name, email, password, profilePic, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ name, email, password, profilePic, role });
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

   // user detail route
const getUserData = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  // All user detail route 
const getAllUserData = async (req, res) => {
    try {
      const allUser = await User.find().select('-password');
      res.json(allUser);
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

const updateUserData = async (req, res) => {
  try {
    // Get the session user (the logged-in user making the request)
    const { userId, name, email, role } = req.body; // Data to update

    // Prepare the payload for updating
    const payload = {
      ...(email && { email : email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    // Check if the current user has the admin role
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Only admins can make changes.' });
    }
    

    // Update the user data
    const updatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });


    res.json({
      data: updatedUser,
      message: "User updated successfully.",
    });
  } catch (error) {
    console.error("Error updating user: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

  module.exports = { registerUser, loginUser, getUserData, getAllUserData, logoutUser, updateUserData };

  