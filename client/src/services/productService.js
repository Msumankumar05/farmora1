import { get, post, put, del } from './api';

export const getProducts = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return get(`/products${query ? `?${query}` : ''}`);
};

export const getProductById = (id) => get(`/products/${id}`);

export const createProduct = (data) => post('/products', data);

export const updateProduct = (id, data) => put(`/products/${id}`, data);

export const deleteProduct = (id) => del(`/products/${id}`);
