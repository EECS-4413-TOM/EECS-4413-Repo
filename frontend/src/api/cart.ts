import apiClient from "./client"

/** match backend CartResponse / CartItemResponse */
export type ApiCartItem = {
  id: number
  item_id: number
  quantity: number
  price: number | null
  item: {
    id: number
    name: string
    description: string
    genre: string | null
    brand: string | null
    price: number | null
    quantity: number
    cover_url?: string | null
  }
}

export type CartResponse = {
  id: number
  items: ApiCartItem[]
  total_price: number
}

export async function getCart(): Promise<CartResponse> {
  const { data } = await apiClient.get<CartResponse>("/cart/")
  return data
}

export async function addToCartApi(
  itemId: number,
  quantity = 1
): Promise<CartResponse> {
  const { data } = await apiClient.post<CartResponse>("/cart/items", {
    item_id: itemId,
    quantity,
  })
  return data
}

export async function updateCartItemApi(
  itemId: number,
  quantity: number
): Promise<CartResponse> {
  const { data } = await apiClient.put<CartResponse>(
    `/cart/items/${itemId}`,
    { quantity }
  )
  return data
}

export async function removeFromCartApi(
  itemId: number
): Promise<CartResponse> {
  const { data } = await apiClient.delete<CartResponse>(
    `/cart/items/${itemId}`
  )
  return data
}
