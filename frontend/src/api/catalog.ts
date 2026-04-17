// TODO: Import apiClient from "./client"
// TODO: Import Item type from "../types"
import apiClient from "./client"
import type { Item } from "../types"

/**
 * getItems
 *
 * Sends a GET request to /catalog with optional query parameters.
 * Returns the filtered and sorted list of products.
 *
 * @param params - Optional filters: { category?, brand?, search?, sort_by?, order? }
 * @returns Promise<Item[]>
 */

type GetItemsParams = {
  category?: string
  brand?: string
  search?: string
  sortBy?: string
  order?: string
  limit?: number
  page?: number
}

// we gotta have it so that we search game either in db or api 

export async function searchItems(query: string): Promise<Item[]> {
  const res = await apiClient.get(`/catalog/search?q=${query}`)
  return res.data
}

export async function getItems(params: GetItemsParams = {}): Promise<Item[]> {
  const query = new URLSearchParams()

  if (params.category) query.append("genre", params.category)
  if (params.brand) query.append("brand", params.brand)
  if (params.search) query.append("search", params.search)
  if (params.sortBy) query.append("sort_by", params.sortBy)
  if (params.order) query.append("order", params.order)

  if (params.limit) query.append("limit", String(params.limit))
  if (params.page) query.append("page", String(params.page))

  const res = await apiClient.get(`/catalog/?${query.toString()}`)

  return res.data
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

export async function getItem(id: number): Promise<Item> {
  const res = await apiClient.get(`/catalog/${id}`)
  return res.data
}
