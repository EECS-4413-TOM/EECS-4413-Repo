// TODO: Import useState from "react"
// TODO: Import useNavigate from "react-router-dom"
// TODO: Import { checkout } from "../api/orders"
// TODO: Import { useAuth } from "../hooks/useAuth"
// TODO: Import { useCart } from "../hooks/useCart"

/**
 * CheckoutPage
 *
 * Handles the full checkout flow.
 * URL: /checkout
 *
 * State:
 *   creditCardNumber — string
 *   expiry           — string
 *   cvv              — string
 *   shippingAddress  — string
 *   error            — string | null (shown when payment is denied)
 *   loading          — boolean while request is in-flight
 *
 * Steps to implement:
 * 1. If user is not authenticated, redirect to /login (or show a prompt)
 * 2. Pre-fill shippingAddress from user.address if available
 * 3. Render a form with: credit card number, expiry, CVV, shipping address fields
 * 4. On "Confirm Order" submit:
 *    a. Call checkout({ shipping_address, credit_card_number, ... })
 *    b. On success: call useCart().clearCart(), navigate to /order-confirmation,
 *       passing the returned Order via router state
 *    c. On HTTP 402: set error = "Credit Card Authorization Failed." and show it
 *       Allow user to re-enter card info and try again
 */

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { checkout } from "../api/orders";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const {user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

   if (authLoading) return <div>Loading Checkout</div>;

   if (!user) {
    return (
      <div className="catalog-container">
        <h1 className="catalog-title">Checkout</h1>
        <p>You need an account to continue.</p>

        <Link to="/login" state={{ from: "/checkout" }}>
          Log in
        </Link>

        <Link to="/register" state={{ from: "/checkout" }}>
          Create account
        </Link>
      </div>
    )
   }

   return <div>// real checkout goes here </div>


}

// DO THIS 