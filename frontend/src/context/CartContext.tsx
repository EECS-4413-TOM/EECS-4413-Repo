import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import * as cartApi from "../api/cart"
import { useAuth } from "../hooks/useAuth"

const FALLBACK_IMAGE = "https://placehold.co/300x400?text=No+Image"

export interface CartLine {
  /** Catalog item id (same id used for PUT/DELETE /cart/items/{item_id}) */
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  cart: CartLine[]
  addToCart: (item: Omit<CartLine, "quantity">, quantity?: number) => Promise<void>
  updateQuantity: (itemId: number, quantity: number) => Promise<void>
  removeFromCart: (itemId: number) => Promise<void>
  clearCart: () => void
  /** Re-fetch cart from API when logged in; returns line count (or local guest count). */
  refreshCart: () => Promise<number>
  total: number
}

export const CartContext = createContext<CartContextType | null>(null)

function mapServerCart(res: cartApi.CartResponse): CartLine[] {
  return res.items.map((line) => ({
    id: line.item_id,
    title: line.item.name,
    price: line.item.price ?? 0,
    image: line.item.cover_url || FALLBACK_IMAGE,
    quantity: line.quantity,
  }))
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const [cart, setCart] = useState<CartLine[]>([])
  const cartRef = useRef(cart)
  cartRef.current = cart

  /** Previous user id (null = guest). `undefined` = never set (initial mount). */
  const prevUserIdRef = useRef<number | null | undefined>(undefined)

  const refreshCart = useCallback(async (): Promise<number> => {
    try {
      const res = await cartApi.getCart()
      const mapped = mapServerCart(res)
      setCart(mapped)
      return mapped.length
    } catch (e) {
      console.error("Failed to load cart:", e)
      return cartRef.current.length
    }
  }, [])

  useEffect(() => {
    if (authLoading) return

    ;(async () => {
      const uid = user?.id ?? null
      const prevUid = prevUserIdRef.current

      if (uid === null) {
        prevUserIdRef.current = null
        try {
          await refreshCart()
        } catch (e) {
          console.error("Guest cart load failed:", e)
        }
        return
      }

      const guestJustBecameUser =
        prevUid !== undefined && prevUid === null && uid !== null

      prevUserIdRef.current = uid

      try {
        if (guestJustBecameUser && cartRef.current.length > 0) {
          for (const line of cartRef.current) {
            await cartApi.addToCartApi(line.id, line.quantity)
          }
        }
        await refreshCart()
      } catch (e) {
        console.error("Cart sync failed:", e)
      }
    })()
  }, [user?.id, authLoading, refreshCart])

  async function addToCart(
    item: Omit<CartLine, "quantity">,
    quantity = 1
  ): Promise<void> {
    try {
      await cartApi.addToCartApi(item.id, quantity)
      const res = await cartApi.getCart()
      setCart(mapServerCart(res))
    } catch (e) {
      console.error("addToCart failed:", e)
      throw e
    }
  }

  async function updateQuantity(itemId: number, quantity: number): Promise<void> {
    try {
      if (quantity <= 0) {
        await cartApi.removeFromCartApi(itemId)
      } else {
        await cartApi.updateCartItemApi(itemId, quantity)
      }
      const res = await cartApi.getCart()
      setCart(mapServerCart(res))
    } catch (e) {
      console.error("updateQuantity failed:", e)
      throw e
    }
  }

  async function removeFromCart(itemId: number): Promise<void> {
    try {
      await cartApi.removeFromCartApi(itemId)
      const res = await cartApi.getCart()
      setCart(mapServerCart(res))
    } catch (e) {
      console.error("removeFromCart failed:", e)
      throw e
    }
  }

  function clearCart(): void {
    setCart([])
  }

  const total = cart.reduce((sum, line) => sum + line.price * line.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
