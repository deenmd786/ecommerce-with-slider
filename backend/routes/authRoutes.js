const express = require('express');
const { registerUser, loginUser, getUserData, logoutUser } = require('../controllers/authControllers');
const { protect } = require('../middlewares/authToken');
const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Logout route
router.post('/logout', logoutUser);


// Dashboard route
router.get('/userdetail', protect, getUserData);

module.exports = router;
