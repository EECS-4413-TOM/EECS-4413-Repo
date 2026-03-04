// TODO: Import useState from "react"
// TODO: Import useNavigate, Link from "react-router-dom"
// TODO: Import { useAuth } from "../hooks/useAuth"

/**
 * RegisterPage
 *
 * New user registration form.
 * URL: /register
 *
 * State:
 *   email     — string
 *   password  — string
 *   confirmPassword — string
 *   firstName — string
 *   lastName  — string
 *   error     — string | null
 *   loading   — boolean
 *
 * Steps to implement:
 * 1. Render fields: email, password, confirm password, first name, last name
 * 2. Validate: passwords must match before submitting
 * 3. On submit: call useAuth().register({ email, password, first_name, last_name })
 *    - On success: auto-login (AuthContext.register should handle this), navigate to "/"
 *    - On error (e.g., duplicate email): display the error message
 * 4. Show a link to /login ("Already have an account? Sign in")
 */
export default function RegisterPage() {
  // TODO: Implement component
  return null;
}
