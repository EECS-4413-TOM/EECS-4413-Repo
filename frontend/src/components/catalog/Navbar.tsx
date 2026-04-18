import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">TOMAGames</Link>

      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile">My Account</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {user?.is_admin && (
          <Link to="/admin">Admin</Link>
        )}
        <Link to="/cart">Cart ({cart.length})</Link>
      </div>
    </nav>
  );
}