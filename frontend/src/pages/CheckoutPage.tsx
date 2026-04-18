// TODO: Import useState from "react"
// TODO: Import useNavigate from "react-router-dom"
// TODO: Import { checkout } from "../api/orders"
// TODO: Import { useAuth } from "../hooks/useAuth"
// TODO: Import { useCart } from "../hooks/useCart"

/**
 * CheckoutPage
 *
 * Handles the full checkout flow.
 * URL: /checkout
 *
 * State:
 *   creditCardNumber — string
 *   expiry           — string
 *   cvv              — string
 *   shippingAddress  — string
 *   error            — string | null (shown when payment is denied)
 *   loading          — boolean while request is in-flight
 *
 * Steps to implement:
 * 1. If user is not authenticated, redirect to /login (or show a prompt)
 * 2. Pre-fill shippingAddress from user.address if available
 * 3. Render a form with: credit card number, expiry, CVV, shipping address fields
 * 4. On "Confirm Order" submit:
 *    a. Call checkout({ shipping_address, credit_card_number, ... })
 *    b. On success: call useCart().clearCart(), navigate to /order-confirmation,
 *       passing the returned Order via router state
 *    c. On HTTP 402: set error = "Credit Card Authorization Failed." and show it
 *       Allow user to re-enter card info and try again
 */

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { checkout } from "../api/orders"
import { useAuth } from "../hooks/useAuth"
import { useCart } from "../hooks/useCart"
import { useEffect } from "react"

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()

  const [creditCardNumber, setCreditCardNumber] = useState("4111111111111111")
  const [expiry, setExpiry] = useState("12/30")
  const [cvv, setCvv] = useState("123")
  const [shippingAddress, setShippingAddress] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // autofill shipping address if available
  useEffect(() => {
    if (user?.address) {
      setShippingAddress(user.address)
    }
  }, [user])

  if (authLoading) {
    return (
      <div className="catalog-container">
        <p>Loading checkout</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="catalog-container">
        <h1 className="catalog-title">Checkout</h1>

        <p>Make an account to continue</p>

        <Link to="/login" state={{ from: "/checkout" }}>
          Log in
        </Link>

        <br />

        <Link to="/register" state={{ from: "/checkout" }}>
          Register
        </Link>
      </div>
    )
  }

  async function handleCheckout() {
    setError(null)

    if (!shippingAddress.trim()) {
      setError("Shipping address is required.")
      return
    }

    if (cart.length === 0) {
      setError("Your cart is empty.")
      return
    }

    setLoading(true)

    try {
      const order = await checkout({
        shipping_address: shippingAddress,
        credit_card_number: creditCardNumber,
        credit_card_expiry: expiry,
        credit_card_cvv: cvv,
      })

      clearCart()

      navigate("/order-confirmation", {
        state: { order },
      })
    } catch (err: any) {
      const status = err?.response?.status

      if (status === 402) {
        setError("Credit Card Authorization Failed. Please try again.")
      } else if (status === 400) {
        setError(err.response?.data?.detail || "Checkout failed.")
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Checkout</h1>

      <div className="product-card" style={{ maxWidth: "500px" }}>
        <p><b>Items:</b> {cart.length}</p>

        <input
          placeholder="Shipping Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />

        <hr />

        <input
          placeholder="Card Number"
          value={creditCardNumber}
          onChange={(e) => setCreditCardNumber(e.target.value)}
        />

        <input
          placeholder="Expiry"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />

        <input
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />

        {error && (
          <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
            {error}
          </p>
        )}

        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Processing" : "Confirm Order"}
        </button>
      </div>
    </div>
  )
}