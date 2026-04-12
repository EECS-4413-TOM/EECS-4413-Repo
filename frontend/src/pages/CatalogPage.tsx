import React, { useState, useEffect } from "react"
import { getItems, searchItems } from "../api/catalog"
import { useCart } from "../hooks/useCart"

// to get the image of the game OR go to a temp image if there's none provided:
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

// fixing rating of games:
function formatRating(item: any) {
  if (item.rating) return item.rating.toFixed(1)

  // IGDB sometimes uses rating_count + rating
  if (item.total_rating) return item.total_rating.toFixed(1)

  return "N/A"
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

    let data: any[] = []

    // 🔥 IF user is searching → use IGDB-powered endpoint
    if (search.trim().length > 0) {
      data = await searchItems(search)
    } else {
      // normal catalog (DB)
      data = await getItems({
        category,
        brand,
        search,
        sortBy,
        order,
        limit,
        page
      })
    }

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
      <div className="search-bar">
      <input
        placeholder="Search games..."
        value={search}
        onChange={(e) => {
          setPage(1)
          setSearch(e.target.value)
        }}
      />
</div>
      {/* LOADING */}
      {loading && <div>Loading...</div>}

      {/* EMPTY STATE */}
      {!loading && items.length === 0 && (
        <p>No games found</p>
      )}

      {/* PRODUCTS */}
      <div className="product-grid">
        {items.map((item) => (
          <div className="product-card" key={item.id}>
            <img
              src={getImage(item)}
              alt={item.name || "Game"}
              onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
            />

            <h3>{item.name || "Unnamed Game"}</h3>

            <p>⭐ {formatRating(item)}</p>
            <p>{formatGenres(item)}</p>

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

        <button onClick={() => setPage((p) => p + 1)} disabled={items.length < limit}>
          Next
        </button>
      </div>
    </div>
  )
}