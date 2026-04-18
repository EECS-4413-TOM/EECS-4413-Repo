// TODO: Import useState, useEffect from "react"
// TODO: Import { useAuth } from "../hooks/useAuth"
// TODO: Import { updateProfile } from "../api/auth"
// TODO: Import { getOrders } from "../api/orders"
// TODO: Import { formatCurrency, formatDate } from "../utils/formatters"
// TODO: Import Order type from "../types"

/**
 * ProfilePage
 *
 * Displays and allows editing of the logged-in user's profile.
 * Also shows full purchase history.
 * URL: /profile  (protected — redirect to /login if not authenticated)
 *
 * State:
 *   firstName — string (editable, pre-filled from user)
 *   lastName  — string (editable, pre-filled from user)
 *   email     — string (editable, pre-filled from user)
 *   orders    — Order[] (purchase history)
 *   editMode  — boolean (toggle between view and edit)
 *   loading   — boolean
 *
 * Steps to implement:
 * 1. Pre-fill form fields from useAuth().user on mount
 * 2. useEffect: call getOrders() to load purchase history
 * 3. "Edit" button toggles editMode — shows save/cancel buttons in edit mode
 * 4. On save: call updateProfile({ first_name, last_name, email })
 *    Update user in AuthContext on success
 * 5. Render a list of past orders with: date, total, status, list of items purchased
 */


import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { updateProfile } from "../api/auth"
import { getOrders } from "../api/orders"
import type { Order } from "../types"
import { formatCurrency, formatDate } from "../utils/formatters"

export default function ProfilePage() {
  const { user } = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")

  const [orders, setOrders] = useState<Order[]>([])
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)

  // 1. preload user info
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "")
      setLastName(user.last_name || "")
      setEmail(user.email || "")
      setAddress(user.address || "")
    }
  }, [user])

  // 2. load orders
  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders()
        setOrders(data)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  // 3. save profile
  async function handleSave() {
    try {
      const updated = await updateProfile({
        first_name: firstName,
        last_name: lastName,
        email,
        
      })

      setFirstName(updated.first_name)
      setLastName(updated.last_name)
      setEmail(updated.email)
      setAddress(updated.address || "")

      // optional: sync auth context if needed
      setEditMode(false)
    } catch (err) {
      console.error("Failed to update profile:", err)
    }
  }

  if (!user) return <div className="page-state">Please log in</div>
  if (loading) return <div className="page-state loading">Loading...</div>

  return (
    <div className="profile-container">

      <h2>My Profile</h2>

      {/* profile section */}
      <div className="product-card profile-card">
        {editMode ? (
          <>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <input value={address} onChange={(e) => setAddress(e.target.value)} />

            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p><b>First Name:</b> {firstName}</p>
            <p><b>Last Name:</b> {lastName}</p>
            <p><b>Email:</b> {email}</p>
            <p><b>Address:</b> {address}</p>

            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </>
        )}
      </div>

      {/* ORDERS SECTION */}
      <h3 style={{ marginTop: "40px" }}>Order History</h3>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div key={order.id} className="product-card" style={{ marginBottom: "10px" }}>
          <p><b>Date:</b> {formatDate(order.created_at)}</p>
          <p><b>Total:</b> {formatCurrency(order.total)}</p>
          <p><b>Status:</b> {order.status}</p>

          <div className="profile-orders">
            {order.items.map((item) => (
              <p key={item.id}>
                {item.item.name} × {item.quantity} — {formatCurrency(item.price_at_purchase)}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}