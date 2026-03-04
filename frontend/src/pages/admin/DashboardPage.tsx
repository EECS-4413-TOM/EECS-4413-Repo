// TODO: Import Link from "react-router-dom"
// TODO: Import { useAuth } from "../../hooks/useAuth"

/**
 * DashboardPage
 *
 * Admin overview page — entry point for all admin functions.
 * URL: /admin  (admin-only — redirect if not admin)
 *
 * Steps to implement:
 * 1. Verify user.is_admin via useAuth() — redirect to "/" if false
 * 2. Render quick-link cards to:
 *    - Sales History    → /admin/sales
 *    - Inventory        → /admin/inventory
 *    - User Management  → /admin/users
 * 3. Optionally show summary stats (total orders, total users, low-stock items count)
 *    fetched from the respective admin API endpoints
 */
export default function DashboardPage() {
  // TODO: Implement component
  return null;
}
