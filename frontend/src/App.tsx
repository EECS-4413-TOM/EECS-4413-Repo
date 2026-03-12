import { Routes, Route } from "react-router-dom";
// TODO: Import AuthProvider from "./context/AuthContext"
// TODO: Import CartProvider from "./context/CartContext"
// TODO: Import all Page components from "./pages/..."
import LoginPage from "./pages/LoginPage";

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
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
