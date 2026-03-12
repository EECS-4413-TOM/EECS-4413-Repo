// TODO: Import useState, useEffect from "react"
// TODO: Import { getItems } from "../api/catalog"
// TODO: Import { useCart } from "../hooks/useCart"
// TODO: Import Item type from "../types"
// TODO: Import ProductGrid from "../components/catalog/..."
// TODO: Import FilterBar, SortControl, SearchBar from "../components/catalog/..."

import React, { useState, useEffect } from "react"
import { getItems } from "../api/catalog"
import { useCart } from "../hooks/useCart"


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
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart()

  useEffect(() => {
    async function loadItems(){
        const data = await getItems();
        setItems(data);
        setLoading(false)
      }

    loadItems()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
       <section className="hero">
        <h2>asdasdasdadadasdasdsa</h2>
        <p>hello test 123 hello</p>
        <button className="buttons">button</button>
      </section>

      <div className="product-grid">
        {items.map(item => (
          <div key={item.id} className="product-card">
            <img src={item.image} style={{ width: "100%" }} />
            <h3>{item.title}</h3>
            <p>${item.price}</p>

            <button className="buttons" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
