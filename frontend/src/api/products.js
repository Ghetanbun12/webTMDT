import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api/products", // đổi nếu backend port khác

});
export const getProducts = () => API.get("/");
export const searchProducts = (keyword) => API.get(`/search?keyword=${keyword}`);
export const searchProductsByType = (type) => API.get(`/searchByType?type=${type}`);
export const getSimilarProducts = (id) => API.get(`/similar/${id}`);
export const createProduct = (formData) =>
  API.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateProduct = (id, data) => API.put(`/${id}`, data); 
export const deleteProduct = (id) => API.delete(`/${id}`);
export const getProductById = (id) => API.get(`/${id}`);
export const getBestSellerProducts = () => API.get("/best-seller");
