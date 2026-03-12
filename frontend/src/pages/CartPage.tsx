// TODO: Import useNavigate from "react-router-dom"
// TODO: Import { useCart } from "../hooks/useCart"
// TODO: Import CartItemRow from "../components/cart/..."
// TODO: Import CartSummary from "../components/cart/..."
// TODO: Import { formatCurrency } from "../utils/formatters"

import { useCart } from "../hooks/useCart";
import { link } from "react-router-dom";
import CartItemRow from "../components/cart/CartItemRow";
import CartSummary from "../components/cart/CartSummary";
import { formatCurrency } from "../utils/formatters";

/**
 * CartPage
 *
 * Displays all items in the shopping cart with full edit controls.
 * URL: /cart
 *
 * Steps to implement:
 * 1. Read cart, total, updateQuantity, removeItem from useCart()
 * 2. If cart is empty, show an empty state with a "Browse Products" link
 * 3. Render a list of CartItemRow components (one per cart item):
 *    - Show product name, price per unit, quantity +/- controls, subtotal, remove button
 *    - Quantity changes should call updateQuantity() immediately and reflect in total
 * 4. Render CartSummary at the bottom: total, "Continue Shopping" link, "Checkout" button
 *    - "Continue Shopping" → navigate("/")
 *    - "Checkout" → navigate("/checkout")
 */
export default function CartPage() {
  // TODO: Implement component
  
}
