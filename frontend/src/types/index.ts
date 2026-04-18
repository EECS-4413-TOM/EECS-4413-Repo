export interface Address {
  id: number;
  street: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string | null;
}

/** Body for PATCH-style address updates on PUT /users/me */
export type AddressUpdate = {
  street?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string | null;
};

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  address_id?: number | null;
  /** Present when API embeds `addresses` row (e.g. GET /users/me). */
  address?: Address | null;
}

export interface Item {
  id: number
  name: string
  description: string
  genre: string
  brand: string
  price: number
  quantity: number
  cover_url: string | null
}

export interface OrderItem {
  id: number;
  item_id: number;
  quantity: number;
  price_at_purchase: number;
  item: Item;
}

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
