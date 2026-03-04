// TODO: Import useState from "react"
// TODO: Import useNavigate, Link from "react-router-dom"
// TODO: Import { useAuth } from "../hooks/useAuth"

/**
 * LoginPage
 *
 * Email + password login form.
 * URL: /login
 *
 * State:
 *   email    — string
 *   password — string
 *   error    — string | null (shown on failed login)
 *   loading  — boolean while request is in-flight
 *
 * Steps to implement:
 * 1. Render email and password inputs with controlled state
 * 2. On form submit: call useAuth().login({ email, password })
 *    - On success: navigate to "/" (or the page the user came from)
 *    - On error: catch the 401, set error = "Invalid email or password"
 * 3. Show a link to /register ("Don't have an account? Register")
 */
export default function LoginPage() {
  // TODO: Implement component
  return null;
}
