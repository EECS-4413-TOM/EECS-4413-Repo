import { FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { isAxiosError } from "axios"
import { checkout } from "../api/orders"
import { useAuth } from "../hooks/useAuth"
import { useCart } from "../hooks/useCart"

function buildShippingAddressString(fields: {
  street: string
  city: string
  province: string
  country: string
  zip: string
  phone: string
}): string {
  const cityLine = [fields.city, fields.province, fields.zip]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(", ")
  const parts = [fields.street.trim(), cityLine, fields.country.trim()].filter(
    Boolean,
  )
  const phone = fields.phone.trim()
  if (phone) parts.push(phone)
  return parts.join("\n")
}

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { cart, total, refreshCart } = useCart()

  const [creditCardNumber, setCreditCardNumber] = useState("4111111111111111")
  const [expiry, setExpiry] = useState("12/30")
  const [cvv, setCvv] = useState("123")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [country, setCountry] = useState("")
  const [zip, setZip] = useState("")
  const [phone, setPhone] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const addressSnapshot = user?.address
    ? [
        user.address.street,
        user.address.city,
        user.address.province,
        user.address.zip,
        user.address.country,
        user.address.phone ?? "",
      ].join("|")
    : ""

  useEffect(() => {
    if (!user?.address) return
    const a = user.address
    setStreet(a.street ?? "")
    setCity(a.city ?? "")
    setProvince(a.province ?? "")
    setCountry(a.country ?? "")
    setZip(a.zip ?? "")
    setPhone(a.phone ?? "")
  }, [user?.id, addressSnapshot])

  if (authLoading) {
    return (
      <div className="catalog-container checkout-container">
        <p className="checkout-loading">Loading checkout…</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="catalog-container checkout-container">
        <h1 className="catalog-title checkout-page-title">Checkout</h1>
        <div className="checkout-card checkout-card--guest">
          <p className="checkout-guest-lead">Log in or register to check out.</p>
          <div className="checkout-guest-actions">
            <Link
              to="/login"
              state={{ from: "/checkout" }}
              className="checkout-link-btn checkout-link-btn--primary"
            >
              Log in
            </Link>
            <Link
              to="/register"
              state={{ from: "/checkout" }}
              className="checkout-link-btn"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (
      !street.trim() ||
      !city.trim() ||
      !province.trim() ||
      !country.trim() ||
      !zip.trim()
    ) {
      setError("Please fill in street, city, province, postal code, and country.")
      return
    }

    const shipping_address = buildShippingAddressString({
      street,
      city,
      province,
      country,
      zip,
      phone,
    })

    setLoading(true)
    try {
      const lineCount = await refreshCart()
      if (lineCount === 0) {
        setError("Your cart is empty.")
        setLoading(false)
        return
      }

      const order = await checkout({
        shipping_address,
        credit_card_number: creditCardNumber.replace(/\s/g, ""),
        credit_card_expiry: expiry.trim(),
        credit_card_cvv: cvv.trim(),
      })

      await refreshCart()
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
      <h1 className="catalog-title checkout-page-title">Checkout</h1>

      <div className="checkout-card">
        <div className="checkout-summary">
          <p className="checkout-summary-line">
            <span className="checkout-summary-label">Cart: </span>
            {cart.length} {cart.length === 1 ? "item" : "items"}
            {cart.length > 0 && (
              <>
                {" "}
                — Total <span className="checkout-summary-total">${total.toFixed(2)}</span>
              </>
            )}
          </p>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2 className="checkout-section-title">Shipping</h2>
          <div className="checkout-address-fields">
            <label className="checkout-label" htmlFor="ship-street">
              Street
            </label>
            <input
              id="ship-street"
              className="checkout-input"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              autoComplete="street-address"
            />

            <div className="checkout-grid-row">
              <div>
                <label className="checkout-label" htmlFor="ship-city">
                  City
                </label>
                <input
                  id="ship-city"
                  className="checkout-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  autoComplete="address-level2"
                />
              </div>
              <div>
                <label className="checkout-label" htmlFor="ship-province">
                  Province / state
                </label>
                <input
                  id="ship-province"
                  className="checkout-input"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  required
                  autoComplete="address-level1"
                />
              </div>
            </div>

            <div className="checkout-grid-row">
              <div>
                <label className="checkout-label" htmlFor="ship-zip">
                  Postal code
                </label>
                <input
                  id="ship-zip"
                  className="checkout-input"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                  autoComplete="postal-code"
                />
              </div>
              <div>
                <label className="checkout-label" htmlFor="ship-country">
                  Country
                </label>
                <input
                  id="ship-country"
                  className="checkout-input"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  autoComplete="country-name"
                />
              </div>
            </div>

            <label className="checkout-label" htmlFor="ship-phone">
              Phone <span className="checkout-optional">(optional)</span>
            </label>
            <input
              id="ship-phone"
              className="checkout-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </div>

          <hr className="checkout-divider" />

          <h2 className="checkout-section-title">Payment</h2>
          <p className="checkout-hint">Test checkout only — card is not charged.</p>

          <label className="checkout-label" htmlFor="card">
            Card number
          </label>
          <input
            id="card"
            className="checkout-input"
            placeholder="Card number"
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
            required
            autoComplete="cc-number"
          />

          <div className="checkout-grid-row">
            <div>
              <label className="checkout-label" htmlFor="expiry">
                Expiry
              </label>
              <input
                id="expiry"
                className="checkout-input"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
                autoComplete="cc-exp"
              />
            </div>
            <div>
              <label className="checkout-label" htmlFor="cvv">
                CVV
              </label>
              <input
                id="cvv"
                className="checkout-input"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                autoComplete="cc-csc"
              />
            </div>
          </div>

          {error && <p className="checkout-error">{error}</p>}

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
