// TODO: Import useState, useEffect from "react"
// TODO: Import { getUsers } from "../../api/admin"
// TODO: Import { updateProfile } from "../../api/auth"
// TODO: Import User type from "../../types"

/**
 * UsersPage
 *
 * Admin page for viewing and managing customer accounts.
 * URL: /admin/users  (admin-only)
 *
 * State:
 *   users       — User[] fetched from API
 *   editingUser — User | null (user currently being edited)
 *   loading     — boolean
 *
 * Steps to implement:
 * 1. useEffect: call getUsers() on mount, set users state
 * 2. Render a table: id, name, email, is_admin, actions (Edit)
 * 3. "Edit" button opens an edit form/modal with the user's current info
 *    On save: call updateProfile(data) using an admin-scoped API call
 *    Refresh user list after saving
 */
export default function UsersPage() {
  // TODO: Implement component
  return null;
}
