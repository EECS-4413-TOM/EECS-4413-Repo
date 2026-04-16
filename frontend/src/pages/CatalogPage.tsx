import { useState, useEffect, useRef } from "react"
import { getItems, searchItems } from "../api/catalog"
import { useCart } from "../hooks/useCart"
import { Link, useLocation } from "react-router-dom"

// to get the image of the game OR go to a temp image if there's none provided:
const FALLBACK_IMAGE = "https://placehold.co/300x400?text=No+Image"

/** Loose shape for catalog / IGDB-backed items */
type CatalogItem = {
  id: number
  name?: string
  price?: number
  cover_url?: string | null
  cover?: { image_id?: string }
  screenshots?: { image_id?: string }[]
  rating?: number
  total_rating?: number
  genres?: unknown
  genre?: unknown
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

  //const [category, setCategory] = useState("")
  //const [brand, setBrand] = useState("")
  const [search, setSearch] = useState("")
  //const [sortBy, setSortBy] = useState("")
  // const [order, setOrder] = useState("asc")



  const { addToCart } = useCart()
  const location = useLocation()

  // fix the issue with searchbar interfering when clicking home
  useEffect(() => {
    setSearch("")
    setPage(1)
    setItems([])
    setHasMore(true)
  }, [location.key])

  // debounce API calls (prevents spam requests)
  useEffect(() => {
    const t = setTimeout(() => {
      loadItems()
    }, 300)

    return () => clearTimeout(t)
  }, [page, search])

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
    if (loading) return   // prevent multiple simultaneous loads
    try {
      setLoading(true)

      let data: CatalogItem[] = []

      // 🔥 IF user is searching → use IGDB-powered endpoint
      if (search.trim().length > 0) {
        data = await searchItems(search)
      } else {
        // normal catalog (DB)
        data = await getItems({
          search,
          limit,
          page
        })
      }

      if (!Array.isArray(data)) {
        console.warn("Invalid API response:", data)
        setItems([])
        return
      }

      // if first page → replace
      if (page === 1) {
        setItems(data)
      } else {
        // append for infinite scroll
        setItems((prev: CatalogItem[]) => {
          const combined = [...prev, ...data]

          const unique = combined.filter(
            (item: CatalogItem, index: number, self: CatalogItem[]) =>
              index === self.findIndex((i) => i.id === item.id)
          )

          return unique
        })
      }

      // stop when no more data
      if (page === 1) {
        setHasMore(true)
      }

      if (data.length < limit) {
        setHasMore(false)
      }
    } catch (err) {
      console.error("Failed to load catalog:", err)
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
            setItems([])      // clear the old results 
            setHasMore(true)  // reset the infinite scrolling
            setSearch(e.target.value)
          }}
        />
      </div>

      {/* EMPTY STATE */}
      {!loading && items.length === 0 && (
        <p>No games found</p>
      )}

      {/* PRODUCTS */}
      <div className="product-grid">
        {items.map((item: CatalogItem) => (

          // make all the cards link to the product detail page for that item:
          <Link to={`/product/${item.id}`} key={item.id} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="product-card" key={item.id}>
              <img
                src={getImage(item)}
                alt={item.name || "Game"}
                onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
              />

              <h3>{item.name || "Unnamed Game"}</h3>
              <p>
                {typeof item.price === "number"
                  ? `$${item.price.toFixed(2)}`
                  : `$${item.price ?? "N/A"}`}
              </p>
              <p>⭐ {formatRating(item)}</p>
              <p>{formatGenres(item)}</p>

              <button
                type="button"
                onClick={() =>
                  addToCart({
                    id: item.id,
                    title: item.name ?? "Unnamed Game",
                    price: typeof item.price === "number" ? item.price : 0,
                    image: normalizeImage(item),
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>

      {loading && (
        <p style={{ textAlign: "center", margin: "20px" }}>
          Loading more games...
        </p>
      )}
    </div>
  )
}