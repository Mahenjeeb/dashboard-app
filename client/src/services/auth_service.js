import axios from "axios";
import tokenManager from "@/util/tokenManager.js";

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

const instance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* REQUEST */
instance.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  Promise.reject,
);

/* RESPONSE */
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest.url?.includes("/refresh")) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await tokenManager.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        tokenManager.clearToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export default instance;
