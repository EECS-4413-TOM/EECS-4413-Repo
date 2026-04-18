import { useState, useEffect, useRef } from "react"
import { getItems, searchItems } from "../api/catalog"
import { useCart } from "../hooks/useCart"
import { Link } from "react-router-dom"

// to get the image of the game OR go to a temp image if there's none provided:
const FALLBACK_IMAGE = "https://placehold.co/300x400?text=No+Image"

/** Loose shape for catalog / IGDB-backed items */
type CatalogItem = {
  id: number
  name?: string
  price?: number
  cover_url?: string | null
  quantity? : number
  cover?: { image_id?: string }
  screenshots?: { image_id?: string }[]
  rating?: number
  total_rating?: number
  genres?: unknown
  genre?: unknown
  involved_companies?: string
}

function getImage(item: CatalogItem) {
  if (item.cover_url) return item.cover_url

  if (item.cover?.image_id) {
    return `https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg`
  }

  if (item.screenshots?.[0]?.image_id) {
    return `https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/${item.screenshots[0].image_id}.jpg`
  }

  return FALLBACK_IMAGE
}

function isOutOfStock(item: CatalogItem) {
  return (item.quantity ?? 0) <= 0
}

// fixing rating of games:
function formatRating(item: CatalogItem) {
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

function formatGenres(item: CatalogItem) {
  const genres = item.genres || item.genre

  if (!genres) return "Unknown"

  if (typeof genres === "string") {
    const cleaned = genres.replace(/[{}]/g, "")
    const ids = cleaned.split(",").map(Number)

    return ids
      .map((id) => GENRE_MAP[id] || id)
      .join(", ")
  }

  return "Unknown"
}

function normalizeImage(item: any) {
  const coverId = item.cover?.image_id
  const coverUrl = item.cover?.url

  if (item.cover_url) return item.cover_url
  if (coverUrl) return coverUrl.startsWith("//") ? `https:${coverUrl}` : coverUrl
  if (coverId) return `https://images.igdb.com/igdb/image/upload/t_cover_big/${coverId}.jpg`

  return FALLBACK_IMAGE
}

export default function CatalogPage() {
  const [items, setItems] = useState<CatalogItem[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [limit] = useState(12)
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [order, setOrder] = useState("asc")
  const { addToCart } = useCart()

  useEffect(() => {
    setPage(1)
    setItems([])
    setHasMore(true)
  }, [category, brand, sortBy, order])

  useEffect(() => {
    const t = setTimeout(() => {
      loadItems()
    }, 700)

    return () => clearTimeout(t)
  }, [page, search, category, brand, sortBy, order])

  const lastCallRef = useRef(0)

  function handleScroll() {
    const now = Date.now()

    if (now - lastCallRef.current < 500) return

    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight
    const docHeight = document.documentElement.scrollHeight

    if (
      scrollTop + windowHeight >= docHeight - 200 &&
      !loading &&
      hasMore &&
      search.trim().length === 0
    ) {
      lastCallRef.current = now
      setPage((prev: number) => prev + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [loading, hasMore, search])

  async function loadItems() {
    if (loading) return

    try {
      setLoading(true)

      let data: CatalogItem[] = []

      if (search.trim().length > 0) {
        data = await searchItems(search)
      } else {
        data = await getItems({
          search,
          limit,
          page,
          category,
          brand,
          sortBy,
          order
        })
      }

      if (!Array.isArray(data)) {
        console.warn("Invalid API response:", data)
        setItems([])
        return
      }

      if (page === 1) {
        setItems(data)
      } else {
        setItems((prev: CatalogItem[]) => {
          const combined = [...prev, ...data]

          const unique = combined.filter(
            (item: CatalogItem, index: number, self: CatalogItem[]) =>
              index === self.findIndex((i) => i.id === item.id)
          )

          return unique
        })
      }

      if (page === 1) setHasMore(true)

      if (data.length < limit) setHasMore(false)

    } catch (err) {
      console.error("Failed to load catalog:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

      <section className="hero">
        <h2>Welcome to Our Store</h2>
      </section>

      <div className="search-bar">
        <input
          placeholder="Search games..."
          value={search}
          onChange={(e) => {
            setPage(1)
            setItems([])
            setHasMore(true)
            setSearch(e.target.value)
          }}
        />
      </div>

      <div className="catalog-filters">

        <select
          value={sortBy ? `${sortBy}-${order}` : "none"}
          onChange={(e) => {
            if (e.target.value === "none") {
              setSortBy("")
              setOrder("asc")
              setPage(1)
              setItems([])
              setHasMore(true)
              return
            }

            const [field, ord] = e.target.value.split("-")
            setSortBy(field)
            setOrder(ord)
          }}
        >
          <option value="none">Sort By</option>
          <option value="price-asc">Price (Low → High)</option>
          <option value="price-desc">Price (High → Low)</option>
          <option value="rating-desc">Rating (High → Low)</option>
          <option value="rating-asc">Rating (Low → High)</option>
          <option value="involved_companies-asc">Company (A–Z)</option>
          <option value="involved_companies-desc">Company (Z–A)</option>
        </select>

        <button onClick={() => {
          setCategory("")
          setBrand("")
          setSortBy("")
          setOrder("asc")
        }}>
          Reset Filters
        </button>

      </div>

      {!loading && items.length === 0 && <p>No games found</p>}

      <div className="product-grid">
        {items.map((item: CatalogItem) => (

          <Link to={`/product/${item.id}`} key={item.id} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="product-card">

              {isOutOfStock(item) && (
                <div className="out-of-stock-badge">Out of Stock</div>
              )}

              <img
                src={getImage(item)}
                alt={item.name || "Game"}
                onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
              />

              <h3>{item.name || "Unnamed Game"}</h3>

              <p><b>
                {typeof item.price === "number"
                  ? `$${item.price.toFixed(2)}`
                  : `$${item.price ?? "N/A"}`}
              </b></p>

              <p>⭐ <b>{formatRating(item)} / 100</b></p>
              <p><b>{formatGenres(item)}</b></p>

              <p><b>Company:</b> {item.involved_companies || "Company is Unknown"}</p>

              <button
                type="button"
                disabled={isOutOfStock(item)}
                onClick={() =>
                  void addToCart({
                    id: item.id,
                    title: item.name ?? "Unnamed Game",
                    price: typeof item.price === "number" ? item.price : 0,
                    image: normalizeImage(item),
                  })
                }
              >
                {isOutOfStock(item) ? "Out of Stock" : "Add to Cart"}
              </button>

            </div>
          </Link>
        ))}
      </div>

      {loading && items.length === 0 && (
        <div className="product-grid">
          {[...Array(12)].map((_, i) => (
            <div className="product-card skeleton" key={i}></div>
          ))}
        </div>
      )}

    </div>
  )
}