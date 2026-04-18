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
import { useLocation, useNavigate, Link } from "react-router-dom"
import { formatCurrency, formatDate } from "../utils/formatters"
import type { Order } from "../types"

export default function OrderConfirmationPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const order: Order | undefined = location.state?.order

  // if no order redirect
  if (!order) {
    navigate("/")
    return null
  }

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Order Confirmation</h1>

      <div className="product-card" style={{ marginTop: "20px" }}>
        <p><b>Order ID:</b> #{order.id}</p>
        <p><b>Date Ordered:</b> {formatDate(order.created_at)}</p>
        <p><b>Status Of Order:</b> {order.status}</p>
      </div>

      {/* items bought */}
      <div className="product-card" style={{ marginTop: "20px" }}>
        <h3>Items</h3>

        {order.items.map((item) => {
          const subtotal = item.quantity * item.price_at_purchase

          return (
            <div
              key={item.id}
              style={{
                borderBottom: "1px solid #eee",
                padding: "10px 0"
              }}
            >
              <p><b>{item.item.name}</b></p>
              <p>
                {item.quantity} × {formatCurrency(item.price_at_purchase)}
              </p>
              <p><b>Subtotal:</b> {formatCurrency(subtotal)}</p>
            </div>
          )
        })}
      </div>

      {/* shipping */}
      <div className="product-card" style={{ marginTop: "20px" }}>
        <h3>Shipping</h3>
        <p>{order.shipping_address || "No address provided"}</p>
      </div>

      {/* cost */}
      <div className="product-card" style={{ marginTop: "20px" }}>
        <h3>Total</h3>
        <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
          {formatCurrency(order.total)}
        </p>
      </div>

      {/* continue shopping */}
      <button
        className="continue-btn"
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </button>
    </div>
  )
}