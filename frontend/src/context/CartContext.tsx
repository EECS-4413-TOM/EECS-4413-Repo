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

  const wasAuthenticatedRef = useRef(false)

  const refreshCart = useCallback(async (): Promise<number> => {
    if (!user?.id) {
      return cartRef.current.length
    }
    try {
      const res = await cartApi.getCart()
      const mapped = mapServerCart(res)
      setCart(mapped)
      return mapped.length
    } catch (e) {
      console.error("Failed to load cart:", e)
      return 0
    }
  }, [user?.id])

  useEffect(() => {
    if (authLoading) return

    if (!user?.id) {
      wasAuthenticatedRef.current = false
      return
    }

    const justLoggedIn = !wasAuthenticatedRef.current
    wasAuthenticatedRef.current = true

    ;(async () => {
      try {
        if (justLoggedIn && cartRef.current.length > 0) {
          for (const line of cartRef.current) {
            await cartApi.addToCartApi(line.id, line.quantity)
          }
        }
        const res = await cartApi.getCart()
        setCart(mapServerCart(res))
      } catch (e) {
        console.error("Cart sync failed:", e)
      }
    })()
  }, [user?.id, authLoading])

  useEffect(() => {
    if (!authLoading && !user) {
      setCart([])
    }
  }, [user, authLoading])

  async function addToCart(
    item: Omit<CartLine, "quantity">,
    quantity = 1
  ): Promise<void> {
    if (user?.id) {
      try {
        await cartApi.addToCartApi(item.id, quantity)
        const res = await cartApi.getCart()
        setCart(mapServerCart(res))
      } catch (e) {
        console.error("addToCart failed:", e)
        throw e
      }
      return
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { ...item, quantity }]
    })
  }

  async function updateQuantity(itemId: number, quantity: number): Promise<void> {
    if (user?.id) {
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
      return
    }

    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== itemId))
      return
    }
    setCart((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    )
  }

  async function removeFromCart(itemId: number): Promise<void> {
    if (user?.id) {
      try {
        await cartApi.removeFromCartApi(itemId)
        const res = await cartApi.getCart()
        setCart(mapServerCart(res))
      } catch (e) {
        console.error("removeFromCart failed:", e)
        throw e
      }
      return
    }
    setCart((prev) => prev.filter((i) => i.id !== itemId))
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
