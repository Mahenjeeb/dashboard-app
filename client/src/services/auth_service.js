import axios from "axios";

const instance = axios.create({
  baseURL: "api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

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
        localStorage.removeItem("token");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
