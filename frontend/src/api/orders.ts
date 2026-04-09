// TODO: Import apiClient from "./client"
// TODO: Import Order type from "../types"

/**
 * checkout
 *
 * Sends a POST request to /orders/checkout to process the current cart.
 * On payment success: returns the created Order.
 * On failure: the backend throws HTTP 402; handle the error in the component.
 *
 * @param data - { shipping_address?, credit_card_number, credit_card_expiry, credit_card_cvv }
 * @returns Promise<Order>
 */
export async function checkout(_data: unknown): Promise<unknown> {
  // TODO: return (await apiClient.post("/orders/checkout", data)).data
  throw new Error("Not implemented");
}

/**
 * getOrders
 *
 * Sends a GET request to /orders to retrieve the user's purchase history.
 * Requires authentication.
 *
 * @returns Promise<Order[]>
 */
export async function getOrders(): Promise<unknown[]> {
  // TODO: return (await apiClient.get("/orders")).data
  throw new Error("Not implemented");
}
