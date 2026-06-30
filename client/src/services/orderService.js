import { get, post, put } from './api';

export const createOrder = (products, shippingAddress) =>
  post('/orders', { products, shippingAddress });

export const getMyOrders = () => get('/orders/myorders');

export const getOrderById = (id) => get(`/orders/${id}`);

export const getAllOrders = () => get('/orders/all');

export const updateOrderStatus = (id, status) =>
  put(`/orders/${id}/status`, { status });
