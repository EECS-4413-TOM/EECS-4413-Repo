// TypeScript interfaces that mirror the backend Pydantic response schemas.
// Keep these in sync as you implement the backend.

// TODO: Define the following interfaces:

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}

/**
 * Item
 * Mirrors ItemResponse from backend.
 */

// uncomment below for catalog to work: 
export interface Item {
  id: number
  name: string
  description: string
  category: string
  brand: string
  price: number
  quantity: number
  image_url: string | null
}

/**
 * CartItem
 * Mirrors CartItemResponse from backend.
 * Contains the full nested Item for display purposes.
 */
// export interface CartItem {
//   id: number;
//   item_id: number;
//   quantity: number;
//   item: Item;
// }

/**
 * Cart
 * Mirrors CartResponse from backend.
 */
// export interface Cart {
//   id: number;
//   items: CartItem[];
// }

/**
 * OrderItem
 * Mirrors OrderItemResponse. Stores price_at_purchase as a historical snapshot.
 */
export interface OrderItem {
  id: number;
  item_id: number;
  quantity: number;
  price_at_purchase: number;
  item: Item;
}

/**
 * Order
 * Mirrors OrderResponse from backend.
 */
export interface Order {
  id: number;
  customer_id: number;
  total: number;
  status: string;
  shipping_address: string | null;
  created_at: string;
  items: OrderItem[];
}

export interface Token {
  access_token: string;
  token_type: string;
}
