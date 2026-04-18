

/**
 * DashboardPage
 *
 * Admin overview page — entry point for all admin functions.
 * URL: /admin  (admin-only redirect if not admin)
 
 */

import { Link } from "react-router-dom";

// making cards like catalog page but for admin functions. Each card will link to a different admin page (sales, inventory, users)


type AdminCard = {
  title: string;
  description: string;
  path: string;
  color: string;
};

const cards: AdminCard[] = [
  {
    title: "Sales History",
    description: "VIEW ALL ORDERS.",
    path: "/admin/sales",
    color: "#7ae759",
  },
  {
    title: "Inventory",
    description: "MANAGE STOCK",
    path: "/admin/inventory",
    color: "#7ae759",
  },
  {
    title: "User Management",
    description: "VIEW & UPDATE CUSTOMER ACCOUNTS",
    path: "/admin/users",
    color: "#7ae759",
  },
];


export default function DashboardPage() {

   return (
    <div className="admin-container">

      {/* HERO */}
      <section className="hero">
        <h2>Admin Dashboard</h2>
        <p>Manage store operations and data</p>
      </section>

      {/* GRID */}
      <div className="product-grid">
        {cards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="product-card admin-card">

              <div
                style={{
                  width: "100%",
                  height: "6px",
                  background: card.color,
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              />

              <h3>{card.title}</h3>
              <p style={{ fontSize: "14px", color: "#555" }}>
                {card.description}
              </p>

              <button
                type="button"
                style={{
                  marginTop: "10px",
                  background: card.color,
                  color: "white",
                }}
              >
                Open →
              </button>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

