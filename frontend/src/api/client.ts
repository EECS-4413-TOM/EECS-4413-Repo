// export default apiClient;

// do as says above
import axios from "axios"

export const tokenStorageKey = "token";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
})

// attach JWT token if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default apiClient
