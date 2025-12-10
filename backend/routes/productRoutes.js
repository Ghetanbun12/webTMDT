const express = require('express');
const router = express.Router();
const { getProducts, createProducts,updateProduct, deleteProduct, getProductsById, searchProducts } = require('../middleware/product');
router.get('/',getProducts);
router.get('/search',searchProducts);
router.get('/:id',getProductsById);
router.post('/',createProducts)
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

module.exports = router;
