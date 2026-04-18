export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  address_id?: number | null;
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
