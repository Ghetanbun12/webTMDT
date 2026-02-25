import Cart from "../models/CartItem.js";


export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, name, price, imageUrl, quantity = 1 } = req.body;

    if (!productId)
      return res.status(400).json({ message: "Thiếu productId" });

    let cart = await Cart.findOne({ userId });

    // Chưa có cart → tạo cart mới
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, name, price, imageUrl, quantity }],
      });
      return res.status(201).json(cart);
    }

    // Đã có cart → tìm sản phẩm
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, imageUrl, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("addToCart error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * 📦 Lấy giỏ hàng của user hiện tại
 */
export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId }).populate(
      "items.productId"
    );

    if (!cart) {
      return res.json({
        userId,
        items: [],
      });
    }

    res.json(cart);
    console.log("req.user", cart);
  } catch (err) {
    console.error("getCartItems error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * ✏️ Cập nhật số lượng sản phẩm trong giỏ
 */
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    if (!productId)
      return res.status(400).json({ message: "Thiếu productId" });

    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.status(404).json({ message: "Cart không tồn tại" });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item)
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm trong giỏ" });

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error("updateCartItem error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * ❌ Xóa 1 sản phẩm khỏi giỏ hàng
 */
export const removeCartItem = async (req, res) => {
  try {

    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId });
    const { productId } = req.body;
    if (!cart)
      return res.status(404).json({ message: "Cart không tồn tại" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("removeCartItem error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * 🧹 Xóa toàn bộ giỏ hàng
 */
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );

    res.json({ message: "Đã xóa toàn bộ giỏ hàng" });
  } catch (err) {
    console.error("clearCart error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
