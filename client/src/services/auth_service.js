import axios from "axios";
import tokenManager from "@/util/tokenManager.js";

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;
const instance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// Request interceptor to add token to headers
instance.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Response interceptor for handling errors and token refresh
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await tokenManager.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${tokenManager.getAccessToken()}`;
        return instance(originalRequest);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 500) {
          tokenManager.clearToken();
          window.location.href = "/signup";
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
