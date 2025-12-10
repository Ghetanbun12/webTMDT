import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:3000/api/cart", // đổi nếu backend port khác

});
export const getCart = () => API.get("/");
export const addToCart = (data) => API.post("/", data);
export const updateCartItem = (id, data) => API.put(`${id}`, data); 
export const removeFromCart = (id) => API.delete(`/${id}`);