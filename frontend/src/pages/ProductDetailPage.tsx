// TODO: Import useState, useEffect from "react"
// TODO: Import useParams from "react-router-dom"
// TODO: Import { getItem } from "../api/catalog"
// TODO: Import { useCart } from "../hooks/useCart"
// TODO: Import Item type from "../types"

/**
 * ProductDetailPage
 *
 * Displays full details for a single product.
 * URL: /product/:id
 *
 * State:
 *   item        — Item object fetched by ID
 *   quantity    — number selected by the user before adding to cart
 *   loading     — boolean while fetching
 *
 * Steps to implement:
 * 1. Extract id from useParams()
 * 2. useEffect: call getItem(id) and set item state
 * 3. Render: product image, name, brand, category, description
 * 4. Show item.quantity as "In stock: X" (warn if low)
 * 5. Quantity selector (input or +/- buttons)
 * 6. "Add to Cart" button → calls useCart().addToCart(item.id, quantity)
 */
export default function ProductDetailPage() {
  // TODO: Implement component
  return null;
}
