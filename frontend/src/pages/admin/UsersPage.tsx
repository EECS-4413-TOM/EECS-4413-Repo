import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {deleteUser, getUsers} from "../../api/admin";
import type {User} from "../../types";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getUsers();
        if (!cancelled) setUsers(data);
      } catch {
        if (!cancelled) setError("Could not load users.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(u: User) {
    if (
      !window.confirm(
        `Delete user ${u.email} (id ${u.id})? This cannot be undone.`,
      )
    ) {
      return;
    }
    setError(null);
    setDeletingId(u.id);
    try {
      await deleteUser(u.id);
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const detail = e.response?.data?.detail;
        setError(
          typeof detail === "string"
            ? detail
            : "Could not delete user.",
        );
      } else {
        setError("Could not delete user.");
      }
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      <p>
        <Link to="/admin" className="admin-back-btn">
          ← Back to admin
        </Link>
      </p>
      {error && <p>{error}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>first name</th>
            <th>last name</th>
            <th>admin</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.first_name}</td>
              <td>{u.last_name}</td>
              <td>{u.is_admin ? "yes" : "no"}</td>
              <td>
                <button
                  type="button"
                  className="admin-btn-delete"
                  disabled={deletingId === u.id}
                  onClick={() => void handleDelete(u)}
                >
                  {deletingId === u.id ? "Deleting…" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}
