// TODO: Import useContext from "react"
// TODO: Import CartContext from "../context/CartContext"

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
  // TODO: const ctx = useContext(CartContext)
  // TODO: if (!ctx) throw new Error("useCart must be used within CartProvider")
  // TODO: return ctx
  throw new Error("Not implemented");
}
