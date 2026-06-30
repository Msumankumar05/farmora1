import { get, post, put } from './api';

export const loginUser = (email, password) =>
  post('/users/login', { email, password });

export const registerUser = (name, email, phone, password) =>
  post('/users/register', { name, email, phone, password });

export const getUserProfile = () => get('/users/profile');

export const updateUserProfile = (data) => put('/users/profile', data);
