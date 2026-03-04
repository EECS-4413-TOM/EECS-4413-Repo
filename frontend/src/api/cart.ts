// TODO: Import apiClient from "./client"
// TODO: Import Cart type from "../types"

/**
 * getCart
 *
 * Sends a GET request to /cart.
 * Returns the current user's full cart with nested item details.
 * Requires authentication (token attached by interceptor).
 *
 * @returns Promise<Cart>
 */
export async function getCart(): Promise<unknown> {
  // TODO: return (await apiClient.get("/cart")).data
  throw new Error("Not implemented");
}

/**
 * addToCart
 *
 * Sends a POST request to /cart/items to add a product to the cart.
 * If the item already exists, the backend increments the quantity.
 *
 * @param itemId   - The product's numeric ID
 * @param quantity - Number of units to add (default 1)
 * @returns Promise<Cart> — the updated cart
 */
export async function addToCart(itemId: number, quantity: number = 1): Promise<unknown> {
  // TODO: return (await apiClient.post("/cart/items", { item_id: itemId, quantity })).data
  throw new Error("Not implemented");
}

/**
 * updateCartItem
 *
 * Sends a PUT request to /cart/items/:itemId to set an exact quantity.
 * Passing quantity=0 will remove the item from the cart.
 *
 * @param itemId   - The product's numeric ID
 * @param quantity - The new quantity to set
 * @returns Promise<Cart> — the updated cart
 */
export async function updateCartItem(itemId: number, quantity: number): Promise<unknown> {
  // TODO: return (await apiClient.put(`/cart/items/${itemId}`, { quantity })).data
  throw new Error("Not implemented");
}

/**
 * removeFromCart
 *
 * Sends a DELETE request to /cart/items/:itemId to remove a product entirely.
 *
 * @param itemId - The product's numeric ID
 * @returns Promise<Cart> — the updated cart
 */
export async function removeFromCart(itemId: number): Promise<unknown> {
  // TODO: return (await apiClient.delete(`/cart/items/${itemId}`)).data
  throw new Error("Not implemented");
}
