const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // một số option tiêu chuẩn; không bắt buộc nếu version mới nhưng giữ vẫn ổn
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // deprecated trên các version mới
      // useFindAndModify: false // deprecated
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // thoát process nếu không kết nối được
  }
};

module.exports = connectDB;
