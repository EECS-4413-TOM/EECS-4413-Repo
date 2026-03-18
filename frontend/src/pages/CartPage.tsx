// TODO: Import useNavigate from "react-router-dom"
// TODO: Import { useCart } from "../hooks/useCart"
// TODO: Import CartItemRow from "../components/cart/..."
// TODO: Import CartSummary from "../components/cart/..."
// TODO: Import { formatCurrency } from "../utils/formatters"

import { useCart } from "../hooks/useCart";
import { link, useNavigate } from "react-router-dom";
import CartItemRow from "../components/cart/CartItemRow";
import CartSummary from "../components/cart/CartSummary";
import { formatCurrency } from "../utils/formatters";

/**
 * CartPage
 *
 * Displays all items in the shopping cart with full edit controls.
 * URL: /cart
 *
 * Steps to implement:
 * 1. Read cart, total, updateQuantity, removeItem from useCart()
 * 2. If cart is empty, show an empty state with a "Browse Products" link
 * 3. Render a list of CartItemRow components (one per cart item):
 *    - Show product name, price per unit, quantity +/- controls, subtotal, remove button
 *    - Quantity changes should call updateQuantity() immediately and reflect in total
 * 4. Render CartSummary at the bottom: total, "Continue Shopping" link, "Checkout" button
 *    - "Continue Shopping" → navigate("/")
 *    - "Checkout" → navigate("/checkout")
 */
export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div>
        <section className="hero">
          <h2>Your Cart is Empty</h2>
          <p>Add products to see cost</p>
          <button className="buttons" onClick={() => navigate("/")}>
            Browse Products
          </button>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* hero header stuff */}
      <section className="hero">
        <h2>Your Cart</h2>
        <p>Review your selected games</p>
      </section>

      {/* Same grid layout for now.*/}
      <div className="product-grid">
        {cart.map(item => (
          <div key={item.id} className="product-card">
            <img src={item.image} style={{ width: "100%" }} />

            <h3>{item.title}</h3>
            <p>${item.price}</p>

            {/* just like catalogpage style buttons */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                className="buttons"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                className="buttons"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            {/* Subtotal */}
            <p>Subtotal: ${item.price * item.quantity}</p>

            <button
              className="buttons"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* total section */}
      <section className="hero">
        <h2>Total: ${total}</h2>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button className="buttons" onClick={() => navigate("/")}>
            Continue Shopping
          </button>

          <button className="buttons" onClick={() => navigate("/checkout")}>
            Checkout
          </button>
        </div>
      </section>
    </div>
  );
}
