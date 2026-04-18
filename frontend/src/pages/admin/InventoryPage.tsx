import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getInventory, updateItem} from "../../api/admin";
import type {Item} from "../../types";

// just puts lowest id first
function sortListById(list: Item[]) {
  let copy = list.slice();
  copy.sort((a, b) => a.id - b.id);
  return copy;
}

export default function InventoryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stillHere = true;

    async function loadInventory() {
      try {
        const fromApi = await getInventory();
        if (stillHere) {
          setItems(sortListById(fromApi));
        }
      } catch {
        if (stillHere) {
          setError("Could not load inventory.");
        }
      } finally {
        if (stillHere) {
          setLoading(false);
        }
      }
    }

    loadInventory();

    return () => {
      stillHere = false;
    };
  }, []);

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
          <tr style={{background: "rgb(107, 91, 231)", color: "#fff"}}>
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
              <td>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const fd = new FormData(form);
                    const qty = parseInt(String(fd.get("qty")), 10);
                    if (isNaN(qty) || qty < 0) {
                      return;
                    }
                    if (qty === item.quantity) {
                      return;
                    }
                    try {
                      setError(null);
                      await updateItem(item.id, {quantity: qty});
                      // grab fresh list from server so we see whats actually saved
                      const fromApi = await getInventory();
                      setItems(sortListById(fromApi));
                    } catch {
                      setError("Could not update quantity.");
                    }
                  }}
                >
                  <input
                    key={`${item.id}-${item.quantity}`}
                    name="qty"
                    type="number"
                    min={0}
                    defaultValue={item.quantity}
                  />{" "}
                  <button type="submit">save</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
