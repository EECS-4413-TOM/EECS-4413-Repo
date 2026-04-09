import axios from "axios";

export const tokenStorageKey = "token";

const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem(tokenStorageKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
