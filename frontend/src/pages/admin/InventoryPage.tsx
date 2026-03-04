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
export default function InventoryPage() {
  // TODO: Implement component
  return null;
}
