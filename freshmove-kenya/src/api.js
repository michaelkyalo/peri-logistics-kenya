// freshmove-kenya/src/api.js
import axios from "axios";

// Detect if running on Vercel
const isVercel = window.location.hostname.includes("vercel.app");

// Create Axios instance
export const api = axios.create({
  baseURL: isVercel ? "/api" : "http://127.0.0.1:5000/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true, // optional: include if your backend uses cookies
});

// Optional: Add request/response logging for debugging
api.interceptors.request.use(request => {
  console.log("Starting Request:", request.method.toUpperCase(), request.url);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log("Response:", response.status, response.data);
    return response;
  },
  error => {
    console.error("API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);
