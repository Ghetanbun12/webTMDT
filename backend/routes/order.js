import express from "express";
const router = express.Router();
import {
    getOrders,
    createOrder,
    deleteOrder,
    getOrdersByUser,
    updateOrderStatus,
    getOrderById,
    cancelOrder

} from "../middleware/order.js";
import authMiddleware from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js"; 
router.use(authMiddleware);

// Admin
router.get("/", checkRole("user"), getOrders);
router.put("/:id/status", checkRole("admin"), updateOrderStatus);
router.delete("/:id", checkRole("admin"), deleteOrder);

// User
router.post("/", createOrder);
router.get("/my-orders", getOrdersByUser);
router.get("/:id", getOrderById);
router.put("/:id/cancel", cancelOrder);
export default router;

