// TODO: Import axios from "axios"

/**
 * Configured Axios instance used by all API modules.
 * Sets the base URL so every call is relative to /api.
 *
 * Steps to implement:
 * 1. Create the instance:
 *    const apiClient = axios.create({ baseURL: "/api" })
 *
 * 2. Add a request interceptor:
 *    - Read the JWT token from localStorage (key: "token")
 *    - If present, attach it as: config.headers.Authorization = `Bearer ${token}`
 *    - Return the modified config
 *
 * 3. Export apiClient as default
 */

// TODO: const apiClient = axios.create({ baseURL: "/api" });

// TODO: apiClient.interceptors.request.use(...)

// export default apiClient;

// do as says above
import axios from "axios"

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