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

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getItem } from "../api/catalog"
import { useCart } from "../hooks/useCart"
import type { Item } from "../types"

const FALLBACK_IMAGE = "https://placehold.co/300x400?text=No+Image"

function getImage(item: any) {
  if (item.cover_url) return item.cover_url

  if (item.cover?.image_id) {
    return `https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg`
  }

  if (item.screenshots?.[0]?.image_id) {
    return `https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/${item.screenshots[0].image_id}.jpg`
  }

  return FALLBACK_IMAGE
}


export default function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [item, setItem] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchItem() {
      try {
        setLoading(true)
        const data = await getItem(Number(id))
        setItem(data)
      } catch (err) {
        console.error("Failed to load item:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchItem()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!item) return <p>Item not found</p>

  return (
    <div className="catalog-container">
      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>

        {/* display image */}
        <div className="product-image">
          <img
            src={getImage(item)}
            alt={item.name}
          />
        </div>

        {/* details */}
        <div style={{ flex: 1 }}>
          <h2 className="product-title">{item.name}</h2>

          <p className="product-price">
            {item.price != null ? `$ ${item.price.toFixed(2)}` : "Price not available"}
          </p>
          <p>
            <strong>In stock:</strong>{" "}
            {item.quantity ?? "N/A"}
          </p>

          {/* quantity */}
          <div className="quantity-controls">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
              -
            </button>

            <span>{quantity}</span>

            <button onClick={() => setQuantity(q => q + 1)}>
              +
            </button>
          </div>

          {/* description */}
          <div className="product-description">
            <h3>Description</h3>
            <p>{item.description || "No description available."}</p>
          </div>

          {/* Add to Cart */}
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart({ ...item, quantity })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
