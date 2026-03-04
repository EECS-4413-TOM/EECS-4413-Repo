// TODO: Import apiClient from "./client"
// TODO: Import Item type from "../types"

/**
 * getItems
 *
 * Sends a GET request to /catalog with optional query parameters.
 * Returns the filtered and sorted list of products.
 *
 * @param params - Optional filters: { category?, brand?, search?, sort_by?, order? }
 * @returns Promise<Item[]>
 */
export async function getItems(params?: unknown): Promise<unknown[]> {
  // TODO: return (await apiClient.get("/catalog", { params })).data
  throw new Error("Not implemented");
}

/**
 * getItem
 *
 * Sends a GET request to /catalog/:id to fetch a single product's details.
 * Used on the ProductDetailPage.
 *
 * @param id - The product's numeric ID
 * @returns Promise<Item>
 */
export async function getItem(id: number): Promise<unknown> {
  // TODO: return (await apiClient.get(`/catalog/${id}`)).data
  throw new Error("Not implemented");
}
