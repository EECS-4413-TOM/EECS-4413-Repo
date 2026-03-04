// TODO: Import apiClient from "./client"
// TODO: Import User, Token types from "../types"

/**
 * register
 *
 * Sends a POST request to /auth/register with the new user's details.
 * On success, returns the created User object.
 *
 * @param data - { email, password, first_name, last_name }
 * @returns Promise<User>
 */
export async function register(data: unknown): Promise<unknown> {
  // TODO: return (await apiClient.post("/auth/register", data)).data
  throw new Error("Not implemented");
}

/**
 * login
 *
 * Sends a POST request to /auth/login with credentials.
 * On success, returns a Token object containing the access_token.
 * Caller is responsible for storing the token in localStorage.
 *
 * @param data - { email, password }
 * @returns Promise<Token>
 */
export async function login(data: unknown): Promise<unknown> {
  // TODO: return (await apiClient.post("/auth/login", data)).data
  throw new Error("Not implemented");
}

/**
 * getProfile
 *
 * Sends a GET request to /users/me with the JWT in the header (attached by interceptor).
 * Returns the current logged-in user's profile.
 *
 * @returns Promise<User>
 */
export async function getProfile(): Promise<unknown> {
  // TODO: return (await apiClient.get("/users/me")).data
  throw new Error("Not implemented");
}

/**
 * updateProfile
 *
 * Sends a PUT request to /users/me with partial user fields to update.
 * Returns the updated User object.
 *
 * @param data - Partial<{ first_name, last_name, email }>
 * @returns Promise<User>
 */
export async function updateProfile(data: unknown): Promise<unknown> {
  // TODO: return (await apiClient.put("/users/me", data)).data
  throw new Error("Not implemented");
}
