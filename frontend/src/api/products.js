import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:3000/api/products", // đổi nếu backend port khác

});
export const getProducts = () => API.get("/");
export const searchProducts = (keyword) => API.get(`/search?keyword=${keyword}`);
export const searchProductsByType = (type) => API.get(`/searchByType?type=${type}`);
export const createProduct = (data) => API.post("/", data);
export const updateProduct = (id, data) => API.put(`/${id}`, data); 
export const deleteProduct = (id) => API.delete(`/${id}`);
export const getProductById = (id) => API.get(`/${id}`);
