import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { updateProfile } from "../api/auth"
import { getOrders } from "../api/orders"
import type { Address, Order } from "../types"
import { formatCurrency, formatDate } from "../utils/formatters"

function formatAddressLines(a: Address): string {
  const line1 = a.street
  const line2 = [a.city, a.province, a.zip].filter(Boolean).join(", ")
  const line3 = a.country
  const phone =
    a.phone && a.phone.length > 0 ? `Phone: ${a.phone}` : null
  return [line1, line2, line3, phone].filter(Boolean).join("\n")
}

export default function ProfilePage() {
  const { user, loading: authLoading, refreshUser } = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [country, setCountry] = useState("")
  const [zip, setZip] = useState("")
  const [phone, setPhone] = useState("")

  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    setFirstName(user.first_name ?? "")
    setLastName(user.last_name ?? "")
    setEmail(user.email ?? "")
    const a = user.address
    setStreet(a?.street ?? "")
    setCity(a?.city ?? "")
    setProvince(a?.province ?? "")
    setCountry(a?.country ?? "")
    setZip(a?.zip ?? "")
    setPhone(a?.phone ?? "")
  }, [user])

  useEffect(() => {
    if (!user?.id) {
      setOrders([])
      return
    }

    let cancelled = false
    setOrdersLoading(true)

    ;(async () => {
      try {
        const data = await getOrders()
        if (!cancelled) setOrders(data)
      } catch (e) {
        console.error("Failed to load orders:", e)
        if (!cancelled) setOrders([])
      } finally {
        if (!cancelled) setOrdersLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [user?.id])

  async function handleSave() {
    if (!user) return
    setSaveError(null)
    try {
      const patch: Parameters<typeof updateProfile>[0] = {
        first_name: firstName,
        last_name: lastName,
        email,
      }

      const addr = {
        street: street.trim(),
        city: city.trim(),
        province: province.trim(),
        country: country.trim(),
        zip: zip.trim(),
        phone: phone.trim() ? phone.trim() : null,
      }
      const hasAnyAddress =
        !!addr.street ||
        !!addr.city ||
        !!addr.province ||
        !!addr.country ||
        !!addr.zip ||
        !!addr.phone

      if (user.address || hasAnyAddress) {
        patch.address = addr
      }

      await updateProfile(patch)
      await refreshUser()
      setEditMode(false)
    } catch (err: unknown) {
      const detail = (err as { response?: { data?: { detail?: unknown } } })?.response
        ?.data?.detail
      setSaveError(
        typeof detail === "string"
          ? detail
          : "Could not save profile. Please try again."
      )
    }
  }

  if (authLoading) {
    return <div className="page-state loading">Loading…</div>
  }

  if (!user) {
    return <div className="page-state">Please log in to view your profile.</div>
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="product-card profile-card">
        {editMode ? (
          <>
            <label className="profile-label">
              First name
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="profile-label">
              Last name
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="profile-label">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <p style={{ fontWeight: 600, marginTop: 12, marginBottom: 4 }}>
              Address
            </p>
            {!user.address && (
              <p style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>
                Add your full address (street through zip) if you don&apos;t have
                one yet.
              </p>
            )}
            <label className="profile-label">
              Street
              <input value={street} onChange={(e) => setStreet(e.target.value)} />
            </label>
            <label className="profile-label">
              City
              <input value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label className="profile-label">
              Province
              <input
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </label>
            <label className="profile-label">
              Country
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
            <label className="profile-label">
              Postal / ZIP code
              <input value={zip} onChange={(e) => setZip(e.target.value)} />
            </label>
            <label className="profile-label">
              Phone
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            {saveError && (
              <p style={{ color: "#b30000", marginTop: 8 }}>{saveError}</p>
            )}
            <div className="profile-form-actions">
              <button
                type="button"
                className="profile-btn profile-btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="profile-btn profile-btn-secondary"
                onClick={() => {
                  setSaveError(null)
                  setEditMode(false)
                  if (user) {
                    setFirstName(user.first_name ?? "")
                    setLastName(user.last_name ?? "")
                    setEmail(user.email ?? "")
                    const a = user.address
                    setStreet(a?.street ?? "")
                    setCity(a?.city ?? "")
                    setProvince(a?.province ?? "")
                    setCountry(a?.country ?? "")
                    setZip(a?.zip ?? "")
                    setPhone(a?.phone ?? "")
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              <b>First name:</b> {firstName}
            </p>
            <p>
              <b>Last name:</b> {lastName}
            </p>
            <p>
              <b>Email:</b> {email}
            </p>
            <p>
              <b>Address:</b>
              {user.address ? (
                <span
                  style={{
                    display: "block",
                    marginTop: 6,
                    whiteSpace: "pre-line",
                    fontWeight: 400,
                  }}
                >
                  {formatAddressLines(user.address)}
                </span>
              ) : (
                <span> —</span>
              )}
            </p>
            <button
              type="button"
              className="profile-btn profile-btn-primary profile-btn-edit"
              onClick={() => setEditMode(true)}
            >
              Edit profile
            </button>
          </>
        )}
      </div>

      <h3 style={{ marginTop: "40px" }}>Order history</h3>

      {ordersLoading ? (
        <p>Loading orders…</p>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="product-card"
            style={{ marginBottom: "10px" }}
          >
            <p>
              <b>Date:</b> {formatDate(order.created_at)}
            </p>
            <p>
              <b>Total:</b> {formatCurrency(order.total)}
            </p>
            <p>
              <b>Status:</b> {order.status}
            </p>
            {order.shipping_address && (
              <p>
                <b>Ship to:</b> {order.shipping_address}
              </p>
            )}
            <div className="profile-orders">
              {order.items.map((line) => (
                <p key={line.id}>
                  {line.item.name} × {line.quantity} —{" "}
                  {formatCurrency(line.price_at_purchase)}
                </p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
