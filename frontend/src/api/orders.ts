
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

import apiClient from "./client";
import type { Order } from "../types";

/**
 * Checkout cart and create order
 */
export async function checkout(data: {
  shipping_address?: string
  credit_card_number: string
  credit_card_expiry: string
  credit_card_cvv: string
}): Promise<Order> {
  const { data: order } = await apiClient.post<Order>(
    "/orders/checkout",
    data
  )
  return order
}

/**
 * Get user's order history
 */
export async function getOrders(): Promise<Order[]> {
  const { data } = await apiClient.get<Order[]>("/orders")
  return data
}
