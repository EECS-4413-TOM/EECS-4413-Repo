import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password});
      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          padding: "40px 32px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          boxSizing: "border-box",
          transform: "translateX(-8px)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "32px",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          Login
        </h1>
        {error && (
          <div
            style={{
              marginBottom: "16px",
              padding: "10px 12px",
              borderRadius: "8px",
              backgroundColor: "#ffe6e6",
              color: "#b30000",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                backgroundColor: "#fafafa",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                backgroundColor: "#fafafa",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px 0",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#f44336",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "12px",
            }}
          >
            {loading ? "Logging in..." : "Login ➜"}
          </button>
          <Link
            to="/register"
            style={{
              display: "block",
              width: "100%",
              boxSizing: "border-box",
              textAlign: "center",
              padding: "10px 0",
              borderRadius: "999px",
              border: "1px solid #e0e0e0",
              backgroundColor: "#ffffff",
              color: "#333333",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            Register now!
          </Link>
        </form>
      </div>
    </div>
  );
}

