import axios from "axios";

export const tokenStorageKey = "token";

// Same-origin `/api`: Vite dev server proxies to localhost:8000; nginx proxies in production.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  // Guest cart uses HttpOnly session_id cookie from the API — send cookies on all requests.
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
