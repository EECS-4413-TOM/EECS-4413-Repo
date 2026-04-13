// TODO: Import apiClient from "./client"
// TODO: Import Item, Order, User types from "../types"

/**
 * getSalesHistory
 *
 * GET /admin/sales — returns all purchase orders across all customers.
 * Requires admin auth token.
 *
 * @returns Promise<Order[]>
 */
export async function getSalesHistory(): Promise<unknown[]> {
  // TODO: return (await apiClient.get("/admin/sales")).data
  throw new Error("Not implemented");
}

/**
 * getInventory
 *
 * GET /admin/inventory — returns the full product list with current quantities.
 * Requires admin auth token.
 *
 * @returns Promise<Item[]>
 */
export async function getInventory(): Promise<unknown[]> {
  // TODO: return (await apiClient.get("/admin/inventory")).data
  throw new Error("Not implemented");
}

/**
 * addItem
 *
 * POST /admin/inventory — creates a new product in the catalog.
 * Requires admin auth token.
 *
 * @param data - { name, description, category, brand, price, quantity, image_url? }
 * @returns Promise<Item>
 */
export async function addItem(_data: unknown): Promise<unknown> {
  // TODO: return (await apiClient.post("/admin/inventory", data)).data
  throw new Error("Not implemented");
}

/**
 * updateItem
 *
 * PUT /admin/inventory/:id — partially updates an existing product.
 * Requires admin auth token.
 *
 * @param id   - The product's numeric ID
 * @param data - Partial item fields to update
 * @returns Promise<Item>
 */
export async function updateItem(_id: number, _data: unknown): Promise<unknown> {
  // TODO: return (await apiClient.put(`/admin/inventory/${id}`, data)).data
  throw new Error("Not implemented");
}

/**
 * getUsers
 *
 * GET /admin/users — returns all registered user accounts.
 * Requires admin auth token.
 *
 * @returns Promise<User[]>
 */
export async function getUsers(): Promise<unknown[]> {
  // TODO: return (await apiClient.get("/admin/users")).data
  throw new Error("Not implemented");
}
