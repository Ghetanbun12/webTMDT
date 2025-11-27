const mongoose = require('mongoose');
const CartItemSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
    },
    name: String,
    price: Number,
    quantity: {
        type: Number,
        default: 1
    }
}, { timestamps: true });
module.exports = mongoose.model('CartItem', CartItemSchema);