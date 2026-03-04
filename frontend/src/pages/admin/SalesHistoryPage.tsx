// TODO: Import useState, useEffect from "react"
// TODO: Import { getSalesHistory } from "../../api/admin"
// TODO: Import Order type from "../../types"
// TODO: Import { formatCurrency, formatDate } from "../../utils/formatters"

/**
 * SalesHistoryPage
 *
 * Admin page for viewing all purchase orders.
 * URL: /admin/sales  (admin-only)
 *
 * State:
 *   orders      — Order[] fetched from API
 *   filterText  — string for client-side filtering by customer or product name
 *   expandedId  — number | null (which order row is expanded to show items)
 *   loading     — boolean
 *
 * Steps to implement:
 * 1. useEffect: call getSalesHistory() on mount, set orders state
 * 2. Render a filter/search input that filters the displayed orders
 * 3. Render a table: order ID, customer ID, date, total, status
 * 4. Clicking a row expands it to show OrderItems:
 *    product name, quantity, price at purchase, subtotal
 */
export default function SalesHistoryPage() {
  // TODO: Implement component
  return null;
}
