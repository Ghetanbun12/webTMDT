const express = require('express');
const router = express.Router();
const { get } = require('mongoose');
const { getCartItems, addToCart, updateCartItem, removeCartItem } = require('../middleware/cart');
router.get("/",getCartItems);
router.post("/",addToCart);
router.put("/:id",updateCartItem);
router.delete("/:id",removeCartItem);
module.exports = router;