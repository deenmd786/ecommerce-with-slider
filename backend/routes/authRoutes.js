const express = require('express');
const { registerUser, loginUser, getUserData, logoutUser, getAllUserData, updateUserData } = require('../controllers/authControllers');
const { protect } = require('../middlewares/authToken');
const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Logout route
router.post('/logout', logoutUser);


// user detail route
router.get('/userdetail', protect, getUserData);

// All user detail route
router.get('/all-user-detail', protect, getAllUserData)
;
// update user data route
router.post('/update-user', protect, updateUserData);

module.exports = router;
