import apiClient from "./client";
import type { Item, Order } from "../types";

export type ItemCreateInput = {
  igdb_id: number;
  name: string;
  description: string;
  genre: string;
  brand: string;
  price: number;
  quantity: number;
  cover_url?: string | null;
};

export type ItemUpdateInput = Partial<{
  name: string;
  description: string;
  genre: string;
  brand: string;
  price: number;
  quantity: number;
  cover_url: string | null;
}>;

export async function getSalesHistory(): Promise<Order[]> {
  const res = await apiClient.get<Order[]>("/admin/sales");
  return res.data;
}

export async function getInventory(): Promise<Item[]> {
  const res = await apiClient.get<Item[]>("/admin/inventory");
  return res.data;
}

export async function addItem(data: ItemCreateInput): Promise<Item> {
  const res = await apiClient.post<Item>("/admin/inventory", data);
  return res.data;
}

export async function updateItem(id: number, data: ItemUpdateInput): Promise<Item> {
  const res = await apiClient.put<Item>(`/admin/inventory/${id}`, data);
  return res.data;
}

export async function getUsers(): Promise<unknown[]> {
  throw new Error("Not implemented");
}
