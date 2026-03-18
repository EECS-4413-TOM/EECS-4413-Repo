// TODO: Import createContext, useContext, useState, useEffect, ReactNode from "react"
// TODO: Import * as cartApi from "../api/cart"
// TODO: Import Cart, CartItem types from "../types"
// TODO: Import useAuth from "../hooks/useAuth"

/**
 * CartContext
 *
 * Provides global shopping cart state to the entire app.
 * Syncs with the backend API whenever the user is authenticated.
 *
 * Context value shape:
 *   cart         — Cart object with items array, or null if not loaded
 *   itemCount    — total number of units across all cart items
 *   total        — sum of (item.price * quantity) for all cart items
 *   addToCart(itemId, quantity) — calls cartApi.addToCart(), refreshes cart
 *   updateQuantity(itemId, qty) — calls cartApi.updateCartItem(), refreshes cart
 *   removeItem(itemId)          — calls cartApi.removeFromCart(), refreshes cart
 *   clearCart()                 — locally resets cart to empty (after checkout)
 *   refreshCart()               — re-fetches cart from backend
 */

// TODO: Define CartContextType interface with the shape above

// TODO: const CartContext = createContext<CartContextType | null>(null)


/**
 * CartProvider
 *
 * Steps to implement:
 * 1. useState for cart (Cart | null), initialized to null
 * 2. useEffect: when isAuthenticated changes to true, call refreshCart()
 *    When logged out, reset cart to null
 * 3. refreshCart(): call cartApi.getCart(), set cart state
 * 4. Derive itemCount and total from cart.items in useMemo or inline
 * 5. addToCart, updateQuantity, removeItem: call API, then refreshCart()
 * 6. Return <CartContext.Provider value={{...}}>{children}</CartContext.Provider>
 */


import React, { createContext, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  total: number;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {

  const [cart, setCart] = useState<CartItem[]>([]);
  function addToCart(item: Omit<CartItem, "quantity">) {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);

      if (existing) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeFromCart(id: number) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  // update the quantity of the item 
  function updateQuantity(id: number, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(prev =>
      prev.map(i =>
        i.id === id
          ? { ...i, quantity }
          : i
      )
    );
  }
    
  // total cost of items
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}
