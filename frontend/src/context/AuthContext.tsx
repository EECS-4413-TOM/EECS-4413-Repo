// TODO: Import createContext, useContext, useState, useEffect, ReactNode from "react"
// TODO: Import * as authApi from "../api/auth"
// TODO: Import User, Token types from "../types"

/**
 * AuthContext
 *
 * Provides global authentication state to the entire app.
 * Wrap the app root with <AuthProvider> in main.tsx or App.tsx.
 *
 * Context value shape:
 *   user         — the logged-in User object, or null if not authenticated
 *   isAuthenticated — boolean derived from whether user is non-null
 *   isAdmin      — boolean, true when user.is_admin === true
 *   login(data)  — calls authApi.login(), stores token in localStorage, loads user
 *   logout()     — clears token from localStorage, sets user to null
 *   register(data) — calls authApi.register(), then auto-logs in
 */

// TODO: Define AuthContextType interface with the shape above

// TODO: const AuthContext = createContext<AuthContextType | null>(null)


/**
 * AuthProvider
 *
 * Steps to implement:
 * 1. useState for user (User | null), initialized to null
 * 2. useEffect on mount: read token from localStorage, call authApi.getProfile()
 *    to restore session, set user state
 * 3. login(data): call authApi.login(data), store token in localStorage,
 *    call authApi.getProfile() to get user object, set user state
 * 4. logout(): remove token from localStorage, set user to null
 * 5. register(data): call authApi.register(data), then call login(data)
 * 6. Return <AuthContext.Provider value={{...}}>{children}</AuthContext.Provider>
 */
export function AuthProvider({ children }: { children: unknown }) {
  // TODO: Implement provider
  return null;
}
