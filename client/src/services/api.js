// Base API URL - Vite proxy forwards /api/* to http://localhost:5000
const BASE_URL = '/api';

/**
 * Core fetch wrapper — attaches JWT token automatically and normalises errors.
 */
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('userToken');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const get = (endpoint) => request(endpoint, { method: 'GET' });

export const post = (endpoint, body) =>
  request(endpoint, { method: 'POST', body: JSON.stringify(body) });

export const put = (endpoint, body) =>
  request(endpoint, { method: 'PUT', body: JSON.stringify(body) });

export const del = (endpoint) => request(endpoint, { method: 'DELETE' });

export default { get, post, put, del };
