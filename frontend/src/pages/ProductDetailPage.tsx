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
import { useParams, useNavigate } from "react-router-dom"
import { getItem } from "../api/catalog"
import { useCart } from "../hooks/useCart"
//import type { Item } from "../types"

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

// fixing genres because they just show the ID of the genre from API. We want to show the name of the genre instead.
const GENRE_MAP: Record<number, string> = {
  4: "Fighting",
  5: "Shooter",
  7: "Music",
  8: "Platform",
  9: "Puzzle",
  10: "Racing",
  11: "Real Time Strategy",
  12: "RPG",
  13: "Simulator",
  14: "Sport",
  15: "Strategy",
  16: "Turn-Based Strategy",
  24: "Tactical",
  25: "Hack and Slash",
  26: "Quiz",
  30: "Pinball",
  31: "Adventure",
  32: "Indie",
  33: "Arcade",
  34: "Visual Novel",
  35: "Card & Board Game",
  36: "MOBA",
  37: "Battle Royale"
}

function formatGenres(item: any) {
  const genres = item.genres || item.genre

  if (!genres) return "Unknown"

  // turn genre string into readable format (e.g. "{12, 14}" → "RPG, Sport")
  if (typeof genres === "string") {
    const cleaned = genres.replace(/[{}]/g, "") // remove { }
    const ids = cleaned.split(",").map(Number)

    return ids
      .map((id) => GENRE_MAP[id] || id)
      .join(", ")
  }

  // if no genre, return "Unknown"
  return "Unknown"
}


export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [item, setItem] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

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
       {/* BREADCRUMB */}
  <p style={{ marginBottom: "20px", color: "#777" }}>
    Home / Catalog / {item.name}
  </p>
      <div className="product-detail">

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

          <p><strong>⭐ Rating:</strong> {item.rating ? `${item.rating.toFixed(1)} / 100` : "N/A"}</p>
          <p><strong>🎮 Genre:</strong> {formatGenres(item)}</p>
          <p><strong>🏢 Company:</strong> {item.involved_companies || "Unknown"}</p>
          <p><strong>📅 Release Date:</strong> {item.release_date
            ? new Date(item.release_date).toLocaleDateString()
            : "Unknown"}
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
            onClick={() => {
              void addToCart(
                {
                  id: item.id,
                  title: item.name ?? "Unknown Game",
                  price: item.price ?? 0,
                  image: getImage(item),
                },
                quantity
              )
              setAdded(true)
            }}
          >
            Add to Cart
          </button>

          {added && (
            <div
              className="cart-popup-overlay"
              onClick={() => setAdded(false)}
            >
              <div
                className="cart-popup-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>✅ Added to Cart</h3>
                <p>{item.name}</p>

                <div className="cart-popup-actions">
                  <button onClick={() => setAdded(false)}>
                    Continue Shopping
                  </button>

                  <button onClick={() => navigate("/cart")}>
                    Go to Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
