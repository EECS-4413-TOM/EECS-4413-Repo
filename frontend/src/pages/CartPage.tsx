

import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

/**
 * CartPage
 *
 * Displays all items in the shopping cart with full edit controls.
 * URL: /cart
 *
 */

const FALLBACK_IMAGE = "https://placehold.co/300x400?text=No+Image"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <section className="hero">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any games to your cart yet.</p>
        <button onClick={() => navigate("/")}>Browse Games</button>
      </section>
    );
  }

  return (
    <div className="cart-container">

      <h2 className="cart-title">Your Cart</h2>

      <div className="cart-layout">

        {/* items */}
        <div className="cart-list">
          {cart.map(item => (
            <div key={item.id} className="cart-row">

              {/* IMAGE */}
              <img src={item.image || FALLBACK_IMAGE } className="cart-image" />

              {/* info */}
              <div className="cart-info">
                <h3>{item.title}</h3>

                {/* QUANTITY */}
                <div className="cart-qty">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
              </div>

              {/* subtotal of purchase */}
              <div className="cart-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              {/* remove item */}
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>

            </div>
          ))}
        </div>

        {/* summary of what you got in your cart */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-line">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="summary-line total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>

          <button
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}