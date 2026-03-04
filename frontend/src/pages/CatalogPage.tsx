// TODO: Import useState, useEffect from "react"
// TODO: Import { getItems } from "../api/catalog"
// TODO: Import { useCart } from "../hooks/useCart"
// TODO: Import Item type from "../types"
// TODO: Import ProductGrid from "../components/catalog/..."
// TODO: Import FilterBar, SortControl, SearchBar from "../components/catalog/..."

/**
 * CatalogPage
 *
 * The main store landing page. Shows all products with filtering/sorting controls.
 *
 * State:
 *   items       — Item[] fetched from the API
 *   loading     — boolean while fetching
 *   category    — selected category filter string
 *   brand       — selected brand filter string
 *   search      — keyword search string
 *   sortBy      — "price" | "name" | undefined
 *   order       — "asc" | "desc"
 *
 * Steps to implement:
 * 1. useEffect: call getItems({ category, brand, search, sort_by, sortBy, order })
 *    whenever any filter/sort state changes, update items state
 * 2. Render a SearchBar, FilterBar (category/brand dropdowns), SortControl (price/name)
 * 3. Render a ProductGrid with the items array
 * 4. Each ProductCard should have an "Add to Cart" button that calls useCart().addToCart()
 * 5. Show a loading spinner while fetching, empty state if no results
 */
export default function CatalogPage() {
  // TODO: Implement component
  return null;
}
