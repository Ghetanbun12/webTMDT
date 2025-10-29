import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // ⚠️ backend bạn chạy port nào thì ghi đúng ở đây
});

// tự động thêm token nếu có
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
