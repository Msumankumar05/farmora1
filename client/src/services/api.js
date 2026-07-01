// Base API URL
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

console.log("BASE_URL =", BASE_URL);

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("userToken");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle non-JSON error responses
  const contentType = res.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(text);
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const get = (endpoint) => request(endpoint, { method: "GET" });

export const post = (endpoint, body) =>
  request(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const put = (endpoint, body) =>
  request(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const del = (endpoint) =>
  request(endpoint, { method: "DELETE" });

export default { get, post, put, del };