import { useState, useEffect } from "react"
import { getSalesHistory, getUsers } from "../../api/admin"
import { updateProfile } from "../../api/auth"
import type { User } from "../../types"
import { Link } from "react-router-dom"

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
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getUsers();
        if (!cancelled) setUsers(data as User[]);
      } catch {
        if (!cancelled) setError("Could not load sales.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Sales history</h1>
      <p>
        <Link to="/admin">Back to admin</Link>
      </p>
      {error && <p>{error}</p>}

      <table border={1}>
        <thead>
          <tr>
            <th>user id</th>
            <th>Customer id</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Line price</th>
          </tr>
        </thead>
        <tbody>
          {users.flatMap((users) =>
            users.length === 0
              ? [
                  <tr key={`${User.id}-empty`}>
                    <td>{user.id}</td>
                    <td>{user.customer_id}</td>
                    <td>{user.created_at}</td>
                    <td>{user.total}</td>
                    <td>{user.status}</td>
                    <td colSpan={3}>(no line items)</td>
                  </tr>,
                ]
              : users.items.map((line) => (
                  <tr key={`${user.id}-${line.id}`}>
                    <td>{user.id}</td>
                    <td>{user.customer_id}</td>
                    <td>{user.created_at}</td>
                    <td>{user.total}</td>
                    <td>{user.status}</td>
                    <td>{line.item.name}</td>
                    <td>{line.quantity}</td>
                    <td>{line.price_at_purchase}</td>
                  </tr>
                ))
          )}
        </tbody>
      </table>
    </div>
  );
}
