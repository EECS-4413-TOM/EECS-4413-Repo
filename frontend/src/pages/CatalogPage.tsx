import React, { useState, useEffect } from "react"
import { getItems } from "../api/catalog"
import { useCart } from "../hooks/useCart"

export default function CatalogPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [limit] = useState(12)

  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [order, setOrder] = useState("asc")

  const { addToCart } = useCart()

  // debounce API calls (prevents spam requests)
  useEffect(() => {
    const t = setTimeout(() => {
      loadItems()
    }, 300)

    return () => clearTimeout(t)
  }, [page, category, brand, search, sortBy, order])

  async function loadItems() {
    try {
      setLoading(true)

      const data = await getItems({
        category,
        brand,
        search,
        sortBy,
        order,
        limit,
        page
      })

      // safety check (VERY important because backend may return invalid rows)
      if (!Array.isArray(data)) {
        console.warn("Invalid API response:", data)
        setItems([])
        return
      }

      setItems(data)
    } catch (err) {
      console.error("Failed to load catalog:", err)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <h2>Welcome to Our Store</h2>
      </section>

      {/* SEARCH */}
      <input
        placeholder="Search games..."
        value={search}
        onChange={(e) => {
          setPage(1)
          setSearch(e.target.value)
        }}
      />

      {/* LOADING */}
      {loading && <div>Loading...</div>}

      {/* EMPTY STATE */}
      {!loading && items.length === 0 && (
        <p>No games found</p>
      )}

      {/* PRODUCTS */}
      <div className="product-grid">
        {items.map((item) => (
          <div key={item.id}>
            <img
  src={
    item.cover_url
      ? item.cover_url
      : item.cover?.image_id
      ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg`
      : item.screenshots?.[0]?.image_id
      ? `https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/${item.screenshots[0].image_id}.jpg`
      : "https://via.placeholder.com/300x400?text=No+Image"
  }
  alt={item.name || "Game"}
/>

            <h3>{item.name || "Unnamed Game"}</h3>

            <p>Rating: {item.rating ?? "N/A"}</p>

            <p>Genre: {item.genre ?? "Unknown"}</p>

            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page}
        </span>

        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}