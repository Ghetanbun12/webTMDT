import BearerToken from "./bearerToken";
export const getOrders = () => BearerToken.get("/orders");

export const createOrder = (data) => BearerToken.post("/orders", data);

export const updateOrderStatus = (id, status) =>
  BearerToken.put(`/orders/${id}/status`, { status });

export const cancelOrder = (id) => BearerToken.put(`/orders/${id}/cancel`);
export const deleteOrder = (id) => BearerToken.delete(`/orders/${id}`);

export const getMyOrders = () => BearerToken.get("/orders/my-orders");
export const getOrderById = (id) => BearerToken.get(`/orders/${id}`);

export const getOrdersByStatus = (status) => BearerToken.get(`/orders/status/${status}`);

export const getOrdersByUser = () => BearerToken.get("/orders/my-orders");

export const completeOrder = (id) => BearerToken.put(`/orders/${id}/complete`);