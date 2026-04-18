import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getInventory} from "../../api/admin";
import type {Item} from "../../types";

export default function InventoryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getInventory();
        if (!cancelled) setItems(data);
      } catch {
        if (!cancelled) setError("Could not load inventory.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  },[]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Inventory</h1>
      <p>
        <Link to="/admin">Back to admin</Link>
      </p>
      {error && <p>{error}</p>}

      <table border={1}>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>genre</th>
            <th>brand</th>
            <th>price</th>
            <th>quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.genre}</td>
              <td>{item.brand}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
