const express = require('express');
const { createProduct, getProduct, updateProduct, getOneProductOfEachCategory, getAllProductsByCategory, getProductById } = require('../controllers/productController'); // Ensure this import is correct
const { protect } = require('../middlewares/authToken');

const router = express.Router();

router.post('/upload-product', protect, createProduct);
router.post('/update-product/:productId', protect, updateProduct);
router.get('/get-product', getProduct);
router.get('/get-oneProduct-category', getOneProductOfEachCategory);
router.get('/get-allProductsby-category', getAllProductsByCategory);
router.get('/get-productById/:productId', getProductById);

module.exports = router;
