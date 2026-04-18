import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getUsers} from "../../api/admin";
import type {User} from "../../types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      <p>
        <Link to="/admin">Back to admin</Link>
      </p>
      {error && <p>{error}</p>}

      <table border={1}>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>first name</th>
            <th>last name</th>
            <th>admin</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
