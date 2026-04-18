import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function apiErrorMessage(err: unknown): string {
  const detail = (err as { response?: { data?: { detail?: unknown } } })?.response
    ?.data?.detail;
  if (typeof detail === "string") {
    return detail;
  }
  return "Registration failed. Please try again.";
}
//Checks phone number fits proper amount of digits and that postal code fits proper format
function phoneDigitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

function normalizeCanadianPostalCode(value: string): string {
  return value.replace(/\s/g, "").toUpperCase();
}

const CANADIAN_POSTAL_CODE = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;

export default function RegisterPage() {
  const navigate = useNavigate();
  const {register} = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] =useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const phoneDigits = phoneDigitsOnly(phone);
    if (phoneDigits.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    const postalNormalized = normalizeCanadianPostalCode(zip);
    if (postalNormalized.length !== 6) {
      setError("Postal code must be 6 characters.");
      return;
    }
    if (!CANADIAN_POSTAL_CODE.test(postalNormalized)) {
      setError(
        "Postal code must be Canadian : letter, number, letter, number, letter, number (e.g. K1A0B1)."
      );
      return;
    }

    setLoading(true);
    try {
      await register({
        email,
        password,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        address: {
          street: street.trim(),
          city: city.trim(),
          province: province.trim(),
          country: country.trim(),
          zip: postalNormalized,
          phone: phoneDigits,
        },
      });
      navigate("/");
    } catch (err: unknown) {
      setError(apiErrorMessage(err));
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
          Register
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
              First name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoComplete="given-name"
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
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Last name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              autoComplete="family-name"
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
              autoComplete="email"
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
              autoComplete="new-password"
              minLength={1}
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
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
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
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Street
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              autoComplete="street-address"
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
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              autoComplete="address-level2"
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
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Province
            </label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              required
              autoComplete="address-level1"
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
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              autoComplete="country-name"
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
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              ZIP / postal code
            </label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
              autoComplete="postal-code"
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
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Phone number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
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
            {loading ? "Creating account…" : "Create account"}
          </button>
          <Link
            to="/login"
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
            Already have an account? Log in
          </Link>
        </form>
      </div>
    </div>
  );
}
