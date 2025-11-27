import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:3000/api/products", // đổi nếu backend port khác

});
export const getProducts = () => API.get("/");
export const createProduct = (data) => API.post("/", data);
export const updateProduct = (id, data) => API.put(`/${id}`, data); 
export const deleteProduct = (id) => API.delete(`/${id}`);
export const getProductById = (id) => API.get(`/${id}`);