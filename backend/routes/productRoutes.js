const express = require('express');
const { createProduct, getProduct, updateProduct, getCategoryProduct } = require('../controllers/productController'); // Ensure this import is correct
const { protect } = require('../middlewares/authToken');

const router = express.Router();

router.post('/upload-product', protect, createProduct);
router.post('/update-product/:productId', protect, updateProduct);
router.get('/get-product', getProduct);
router.get('/get-categoryProduct', getCategoryProduct);

module.exports = router;
