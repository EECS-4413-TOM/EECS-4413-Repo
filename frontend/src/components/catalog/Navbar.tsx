import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">eStore</Link>

      <div className="nav-links">
        <Link to="/">Deals</Link>
        <Link to="/">Pre-Owned</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
      </div>
    </nav>
  );
}