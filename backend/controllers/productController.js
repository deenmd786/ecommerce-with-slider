const uploadProductPermission = require("../helper/permission");
const User = require("../models/authModel");
const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const sessionUser = await User.findById(req.user.id).select("-password");
    if (!sessionUser)
      return res.status(404).json({ message: "User not found" });

    if (!(await uploadProductPermission(req))) {
      return res
        .status(403)
        .json({ message: "No permission to create product" });
    }

    const savedProduct = await new Product(req.body).save();
    res.status(201).json({ message: "Product created", data: savedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const allProduct = await Product.find().sort({ createdAt: -1 });
    if (!allProduct)
      return res.status(404).json({ message: "Products not found" });

    res.status(200).json({ message: "Products retrieved", data: allProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: error.message });
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const productId = await Product.findById(req.params.productId)
   
    if (!productId)
      return res.status(404).json({ message: "Product not found" });

    if (!(await uploadProductPermission(req))) {
      return res
        .status(403)
        .json({ message: "No permission to create product" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId, // Use the product ID to update
      req.body, // The updated product data
      { new: true, runValidators: true } // Return the updated product and run validators
    );
    res.status(200).json({ message: "Product updated", data: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// get Product by category wise...
const getCategoryProduct = async (req, res) => {
  try {

    // Find products by category ID
    const productCategory = await Product.distinct("category");

    // array of storing one product of each category
    const productsByCategory = [];
    
    for(const category of productCategory){
      const products = await Product.findOne({ category });

      if (products) {
        productsByCategory.push(products);
      }
      
    }
    // Check if any products were found
    if (productCategory.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    // Return the found products
    res.status(200).json({ message: "Products retrieved successfully", data: productsByCategory });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to get products" });
  }
};



module.exports = { createProduct, getProduct, updateProduct, getCategoryProduct };
