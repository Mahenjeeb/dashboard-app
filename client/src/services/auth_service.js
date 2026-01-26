import axios from "axios";
import toast from "react-hot-toast";
const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

const instance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await instance.post("/refresh");
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        localStorage.setItem("token", data.accessToken);
        return instance(originalRequest);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 500) {
          toast.error("Session expired. Redirecting...", {
            duration: 2500,
            icon: "⏱️",
            style: {
              background: "#ef4444",
              color: "#fff",
              fontWeight: "500",
              padding: "16px 24px",
              borderRadius: "8px",
            },
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });

          setTimeout(() => {
            window.location.href = "/signup";
          }, 2500);
        }
        localStorage.removeItem("token");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
