// TODO: Import useState, useEffect from "react"
// TODO: Import { getInventory, addItem, updateItem } from "../../api/admin"
// TODO: Import Item type from "../../types"
// TODO: Import { formatCurrency } from "../../utils/formatters"

/**
 * InventoryPage
 *
 * Admin page for managing the product catalog and stock levels.
 * URL: /admin/inventory  (admin-only)
 *
 * State:
 *   items       — Item[] fetched from API
 *   showAddForm — boolean (toggle add-item form/modal)
 *   editingItem — Item | null (item currently being edited)
 *   loading     — boolean
 *
 * Steps to implement:
 * 1. useEffect: call getInventory() on mount, set items state
 * 2. Render a table: name, category, brand, price, quantity, actions (Edit)
 * 3. "Add New Item" button → toggles showAddForm
 *    AddItemForm: name, description, category, brand, price, quantity, image_url
 *    On submit: call addItem(data), refresh inventory list
 * 4. "Edit" button on a row → opens EditItemModal pre-filled with that item's data
 *    On save: call updateItem(item.id, data), refresh inventory list
 */

import {useEffect, useState} from "react";
import { getInventory, addItem, updateItem } from "../../api/admin";
import {getSalesHistory} from "../../api/admin";
import type {Item} from "../../types";
import { formatCurrency } from "../../utils/formatters";

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
