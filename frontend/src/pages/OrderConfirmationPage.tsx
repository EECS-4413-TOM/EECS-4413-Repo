// TODO: Import useLocation, useNavigate, Link from "react-router-dom"
// TODO: Import { formatCurrency, formatDate } from "../utils/formatters"
// TODO: Import Order type from "../types"

/**
 * OrderConfirmationPage
 *
 * Displays the order summary after a successful checkout.
 * URL: /order-confirmation
 *
 * The Order object is passed via React Router state from CheckoutPage:
 *   navigate("/order-confirmation", { state: { order } })
 *
 * Steps to implement:
 * 1. Read the Order from useLocation().state.order
 *    If no order in state (e.g., user navigated directly), redirect to "/"
 * 2. Display:
 *    - Order ID and date
 *    - List of ordered items: name, quantity, price per unit, subtotal
 *    - Shipping address
 *    - Order total
 * 3. "Continue Shopping" button → navigate("/")
 */
export default function OrderConfirmationPage() {
  // TODO: Implement component
  return null;
}
