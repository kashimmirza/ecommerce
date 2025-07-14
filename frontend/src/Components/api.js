/** @format */

import axios from "axios";

const api = axios.create({
 baseURL: "https://localhost:7296/api",
});

export const getProducts = () => api.get("/products");
export const addToCart = (productId, quantity) =>
 api.post("/cart/add", { productId, quantity });
export const removeFromCart = (productId) =>
 api.delete(`/cart/remove/${productId}`);
export const getCartItems = () => api.get("/cart");
export const getUserOrders = () => api.get("/orders");
export const checkout = (cartItems) => api.post("/orders", { cartItems });
