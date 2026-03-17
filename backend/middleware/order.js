import Order from "../models/order.js";
import Cart from "../models/cart.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
export const createOrder = async (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        const userId = req.user.userId;
        const newOrder = new Order({
            user,
            items,
            totalAmount,
        });
        await newOrder.save();
        await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );
        res.status(201).json(newOrder);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findById(id);
        if (!order)
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });    
        order.status = status;
        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Order.findByIdAndDelete(id);
        if (!deleted)
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        res.json({ message: "Xóa đơn hàng thành công" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }   
};
export const getOrdersByUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await Order.find({ userId });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order)
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
export const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await
            Order.findById(id);
        if (!order)
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });        
        order.status = "cancelled";
        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
export const completeOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order)
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        order.status = "completed";
        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
export const getOrdersByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        const orders = await Order.find({ status });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
export const getRevenueByDate = async (req, res) => {  
    try {
        const { startDate, endDate } = req.query;
        const revenue = await Order.aggregate([
            {
                $match: {
                    createdAt: {    
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },  
                    status: "completed",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" },
                },
            },
        ]);
        res.json(revenue[0]?.totalRevenue || 0);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }   
};