import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import mongoose from "mongoose";

import swaggerSpec from "./swagger.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cart.js";
import authMiddleware from "./middleware/auth.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Route bảo vệ
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Bạn đã truy cập route bảo vệ",
    user: req.user,
  });
});

// Root
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy cổng ${PORT}`);
  console.log(`📘 Swagger: http://localhost:${PORT}/api-docs`);
});
