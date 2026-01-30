import axios from "axios";
import toast from "react-hot-toast";
export const useInterceptorAPI = () => {
  // const serverURL = import.meta.env.VITE_SERVER_URL;
  const privateInterceptor = axios.create({
    baseURL: `/api`,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  privateInterceptor.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await privateInterceptor.post("/auth/refresh");
          return privateInterceptor(originalRequest);
        } catch (error) {
          toast.error("Session Expired...")
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );
  return privateInterceptor;
};
