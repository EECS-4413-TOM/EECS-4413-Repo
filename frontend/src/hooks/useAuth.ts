// TODO: Import useContext from "react"
// TODO: Import AuthContext from "../context/AuthContext"

/**
 * useAuth
 *
 * Convenience hook for accessing AuthContext anywhere in the component tree.
 * Throws an error if used outside of <AuthProvider>.
 *
 * Returns:
 *   { user, isAuthenticated, isAdmin, login, logout, register }
 *
 * Usage:
 *   const { user, login, logout } = useAuth()
 */
export function useAuth() {
  // TODO: const ctx = useContext(AuthContext)
  // TODO: if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  // TODO: return ctx
  throw new Error("Not implemented");
}
