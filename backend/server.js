require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose'); // nếu cần
const connectDB = require('./config/db'); // theo cấu trúc bạn đã làm
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);
// ví dụ route bảo vệ
const authMiddleware = require('./middleware/auth');
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Bạn đã truy cập route bảo vệ', user: req.user });
});
app.get('/', (req, res) => {
  res.send('API is running...');
});        
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy cổng ${PORT}`));
