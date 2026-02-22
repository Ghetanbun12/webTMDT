import BearerToken from "./bearerToken";

export const getCart = () => BearerToken.get("/cart");

export const addToCart = (data) =>
  BearerToken.post("/cart", data);

export const updateCartItem = (id, data) =>
  BearerToken.put(`/cart/${id}`, data);

export const removeFromCart = (id) =>
  BearerToken.delete(`/cart/${id}`);