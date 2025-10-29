// src/api/auth.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/auth', // đổi nếu backend port khác
});

// Đăng ký
export const registerUser = (data) => API.post('/register', data);

// Đăng nhập
export const loginUser = (data) => API.post('/login', data);
