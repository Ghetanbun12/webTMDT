import axios from "axios";

const BearerToken = axios.create({
  baseURL: "http://localhost:3000/api",
});

// tự động thêm token nếu có
BearerToken.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default BearerToken;
