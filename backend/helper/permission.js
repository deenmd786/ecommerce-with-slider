const User = require("../models/authModel");

const uploadProductPermission = async (req) => {
    const user = await User.findById(req.user.id).select('-password');

    // Check if user exists
    if (!user) {
        throw new Error("User not found");
    }

    // Check if user is ADMIN
    if (user.role !== 'ADMIN') {
        throw new Error("User does not have permission to upload products");
    }
    
    return true; // Return true if the user is an ADMIN
}

module.exports = uploadProductPermission;
