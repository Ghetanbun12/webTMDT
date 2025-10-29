const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const  regisUser = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
        const { name, email, password } = req.body;
        try {
          // kiểm tra email tồn tại
          let user = await User.findOne({ email });
          if (user) return res.status(400).json({ message: 'Email đã được sử dụng' });
    
          // hash mật khẩu
          const salt = await bcrypt.genSalt(10);
          const hashed = await bcrypt.hash(password, salt);
    
          user = new User({ name, email, password: hashed });
          await user.save();
    
          // tạo token (optional: trả token ngay khi register)
          const payload = { userId: user._id, role: user.role };
          const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
    
          res.status(201).json({
            message: 'Đăng ký thành công',
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Lỗi server' });
        }
      }
const userLogin = async (req, res) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
     
         const { email, password } = req.body;
         try {
           const user = await User.findOne({ email });
           if (!user) return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
     
           const isMatch = await bcrypt.compare(password, user.password);
           if (!isMatch) return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
     
           const payload = { userId: user._id, role: user.role };
           const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
     
           res.json({
             message: 'Đăng nhập thành công',
             user: { id: user._id, name: user.name, email: user.email, role: user.role },
             token
           });
         } catch (err) {
           console.error(err);
           res.status(500).json({ message: 'Lỗi server' });
         }
       }
module.exports =  { userLogin, regisUser } ;
