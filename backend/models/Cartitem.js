import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: String,
      price: Number,
      imageUrl: String,
      quantity: {
        type: Number,
        default: 1,
      },
    },
    { timestamps: true },
  ],
});

const CartItem = mongoose.model("CartItem", CartItemSchema);

export default CartItem;
