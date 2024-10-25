const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
        productName: String,
        brandName: String,
        category: String,
        productImage: [],
        description: String,
        price: Number,
        selling: Number,
}, { timestamps: true });

// Create the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
