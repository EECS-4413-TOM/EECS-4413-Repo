import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  //ADD THIS BACK AFTER LOGIN IS DONE: const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      //ADD THIS AFTER LOGIN IS DONE: await login({ email, password, rememberMe });
      navigate("/");
    } catch (err: any) {
      
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
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                backgroundColor: "#fafafa",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              fontSize: "14px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            <button
              type="button"
              style={{
                border: "none",
                background: "transparent",
                color: "#f44336",
                cursor: "pointer",
                textDecoration: "none",
                padding: 0,
                fontSize: "14px",
              }}
              // Reset pasword page when thats done
              onClick={() => alert("Forgot password flow not implemented yet")}
            >
              Forgot your password?
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 09391f84f04ba4c6c2a50340201e13785116ba51
