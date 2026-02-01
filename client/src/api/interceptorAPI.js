import axios from "axios";
import toast from "react-hot-toast";
export const interceptorAPI = () => {
  // const serverURL = import.meta.env.VITE_SERVER_URL;
  const apiInstance = axios.create({
    baseURL: `/api`,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await apiInstance.post("/auth/refresh");
          return apiInstance(originalRequest);
        } catch (error) {
          toast.error("Session Expired...")
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );
  return apiInstance;
};
