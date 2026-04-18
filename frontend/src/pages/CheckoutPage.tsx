import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { isAxiosError } from "axios"
import { checkout } from "../api/orders"
import { useAuth } from "../hooks/useAuth"
import { useCart } from "../hooks/useCart"

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { cart, clearCart, total, refreshCart } = useCart()

  const [creditCardNumber, setCreditCardNumber] = useState("4111111111111111")
  const [expiry, setExpiry] = useState("12/30")
  const [cvv, setCvv] = useState("123")
  const [shippingAddress, setShippingAddress] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (authLoading) {
    return (
      <div className="catalog-container">
        <p>Loading checkout…</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="catalog-container">
        <h1 className="catalog-title">Checkout</h1>
        <p>Log in to complete your order.</p>
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!shippingAddress.trim()) {
      setError("Shipping address is required.")
      return
    }

    setLoading(true)
    try {
      const lineCount = await refreshCart()
      if (lineCount === 0) {
        setError("Your cart is empty.")
        setLoading(false)
        return
      }

      const order = await checkout({
        shipping_address: shippingAddress.trim(),
        credit_card_number: creditCardNumber.replace(/\s/g, ""),
        credit_card_expiry: expiry.trim(),
        credit_card_cvv: cvv.trim(),
      })

      clearCart()
      navigate("/order-confirmation", { state: { order } })
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const status = err.response?.status
        const detail = err.response?.data?.detail
        const msg =
          typeof detail === "string"
            ? detail
            : Array.isArray(detail)
              ? detail.map((d) => JSON.stringify(d)).join(" ")
              : "Checkout failed."

        if (status === 402) {
          setError("Credit Card Authorization Failed. Please try again.")
        } else if (status === 400) {
          setError(msg)
        } else {
          setError(msg || "Something went wrong. Please try again.")
        }
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="catalog-container checkout-container">
      <h1 className="catalog-title">Checkout</h1>

      <div className="product-card" style={{ maxWidth: "500px" }}>
        <p>
          <b>Items in cart:</b> {cart.length}{" "}
          {cart.length > 0 && (
            <span style={{ color: "#666" }}>
              (estimated total ${total.toFixed(2)})
            </span>
          )}
        </p>

        <form onSubmit={handleSubmit}>
          <label className="checkout-label" htmlFor="shipping">
            Shipping address
          </label>
          <textarea
            id="shipping"
            placeholder="Street, city, province, postal code…"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            rows={3}
            required
            style={{ width: "100%", marginBottom: "12px" }}
          />

          <hr />

          <label className="checkout-label" htmlFor="card">
            Card number
          </label>
          <input
            id="card"
            placeholder="Card number"
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <label className="checkout-label" htmlFor="expiry">
            Expiry
          </label>
          <input
            id="expiry"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <label className="checkout-label" htmlFor="cvv">
            CVV
          </label>
          <input
            id="cvv"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "12px" }}
          />

          {error && (
            <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="checkout-btn"
            disabled={loading}
          >
            {loading ? "Processing…" : "Confirm order"}
          </button>
        </form>
      </div>
    </div>
  )
}
