const express = require('express');
const { createProduct, getProduct, updateProduct } = require('../controllers/productController'); // Ensure this import is correct
const { protect } = require('../middlewares/authToken');

const router = express.Router();

router.post('/upload-product', protect, createProduct);
router.post('/update-product/:productId', protect, updateProduct);
router.get('/get-product', getProduct);

module.exports = router;
