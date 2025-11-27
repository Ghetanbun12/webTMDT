import CartItem from '../models/cartitem.js';
const addToCart = async (req, res) => {
    const { productId, name, price } = req.body;

    const exist = await CartItem.findOne({ productId });

    if (exist) {
        exist.quantity += exist.quantity || 1;
        await exist.save();
        return res.json(exist);
    }

    const newItem = await CartItem.create({ productId, name, price });
    res.json(newItem);

};
const getCartItems = async (req, res) => {
    try{
        const items =  await CartItem.find();
        res.json(items);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};
const updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;  
    try {
        const item = await CartItem.findById(id);
        if (!item) return res.status(404).json({ message: 'Không tìm thấy mục trong giỏ hàng' });   
        item.quantity = quantity;
        await item.save();
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }   
};
const removeCartItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await CartItem.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Không tìm thấy mục trong giỏ hàng' });
        res.json({ message: 'Xóa mục khỏi giỏ hàng thành công' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};
export { addToCart, getCartItems, updateCartItem, removeCartItem };
