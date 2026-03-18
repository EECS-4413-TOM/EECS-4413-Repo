import { Routes, Route } from "react-router-dom";
// TODO: Import AuthProvider from "./context/AuthContext"
// TODO: Import CartProvider from "./context/CartContext"
// TODO: Import all Page components from "./pages/..."
import React from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"


import CatalogPage from "./pages/CatalogPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"
import OrderConfirmationPage from "./pages/OrderConfirmationPage"
import DashboardPage from "./pages/admin/DashboardPage"
import InventoryPage from "./pages/admin/InventoryPage"
import SalesHistoryPage from "./pages/admin/SalesHistoryPage"
import UsersPage from "./pages/admin/UsersPage"
import Navbar from "./components/catalog/Navbar"


// gonna make a simple landing page:

// need to make a dummy interface for games, so that we can display some dummy data on the landing page:


  

/**
 * App
 *
 * Root component — wraps all context providers and defines the route tree.
 *
 * Steps to implement:
 * 1. Wrap everything in <AuthProvider> then <CartProvider>
 * 2. Include a shared <Navbar /> component (always visible)
 * 3. Define routes using <Routes> and <Route>:
 *
 *    /                    → <CatalogPage />
 *    /product/:id         → <ProductDetailPage />
 *    /cart                → <CartPage />
 *    /checkout            → <CheckoutPage />
 *    /login               → <LoginPage />
 *    /register            → <RegisterPage />
 *    /profile             → <ProfilePage />  (protected — redirect if not logged in)
 *    /order-confirmation  → <OrderConfirmationPage />
 *    /admin               → <DashboardPage />   (admin-only)
 *    /admin/inventory     → <InventoryPage />   (admin-only)
 *    /admin/sales         → <SalesHistoryPage /> (admin-only)
 *    /admin/users         → <UsersPage />        (admin-only)
 *
 * Note: Create <ProtectedRoute> and <AdminRoute> wrapper components
 * in src/components/auth/ to guard authenticated and admin-only routes.
 */
export default function App() {
  // TODO: Implement routing and provider tree

  return (
    <CartProvider>

      <Navbar />

      <Routes>

      <Route path="/" element={<CatalogPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      <Route path="/admin" element={<DashboardPage />} />
      <Route path="/admin/inventory" element={<InventoryPage />} />
      <Route path="/admin/sales" element={<SalesHistoryPage />} />
      <Route path="/admin/users" element={<UsersPage />} />
      
      </Routes>

      </CartProvider>
  )
}
