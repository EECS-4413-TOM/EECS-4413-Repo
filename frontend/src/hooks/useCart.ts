

import { useContext } from "react";

import { CartContext } from "../context/CartContext";

/**
 * useCart
 *
 * Convenience hook for accessing CartContext anywhere in the component tree.
 * Throws an error if used outside of <CartProvider>.
 *
 * Returns:
 *   { cart, itemCount, total, addToCart, updateQuantity, removeItem, clearCart, refreshCart }
 *
 * Usage:
 *   const { cart, addToCart, total } = useCart()
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
