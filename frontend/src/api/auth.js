// src/api/auth.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // đổi nếu backend port khác
});

// Đăng ký
export const registerUser = (data) => API.post('/register', data);

// Đăng nhập
export const loginUser = (data) => API.post('/login', data);
export const updateProfile = (data, token) => API.put('/updateProfile', data, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
