
/**
 * OrderConfirmationPage
 *
 * Displays the order summary after a successful checkout.
 * URL: /order-confirmation
 *
 * The Order object is passed thru the React Router state from CheckoutPage:
 *
 */
import { useLocation, useNavigate } from "react-router-dom"
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