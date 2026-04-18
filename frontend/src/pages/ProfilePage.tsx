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
export default function ProfilePage() {
  // TODO: Implement component
  return null;
}

// DO THIS 