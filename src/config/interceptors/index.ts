import { api } from "../api";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or get it from another storage method

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Maybe redirect to login...");
      // Optional: handle logout or redirect here
    }
    return Promise.reject(error);
  }
);
