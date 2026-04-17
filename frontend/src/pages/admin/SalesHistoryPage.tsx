import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getSalesHistory} from "../../api/admin";
import type {Order} from "../../types";

export default function SalesHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getSalesHistory();
        if (!cancelled) setOrders(data);
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
            <th>Order id</th>
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
          {orders.flatMap((order) =>
            order.items.length === 0
              ? [
                  <tr key={`${order.id}-empty`}>
                    <td>{order.id}</td>
                    <td>{order.customer_id}</td>
                    <td>{order.created_at}</td>
                    <td>{order.total}</td>
                    <td>{order.status}</td>
                    <td colSpan={3}>(no line items)</td>
                  </tr>,
                ]
              : order.items.map((line) => (
                  <tr key={`${order.id}-${line.id}`}>
                    <td>{order.id}</td>
                    <td>{order.customer_id}</td>
                    <td>{order.created_at}</td>
                    <td>{order.total}</td>
                    <td>{order.status}</td>
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
