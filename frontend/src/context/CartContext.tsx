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
export function CartProvider({ children }: { children: unknown }) {
  // TODO: Implement provider
  return null;
}
