import { createContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";
import { tokenStorageKey } from "../api/client";
import type { User } from "../types";

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (data: authApi.RegisterBody) => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(tokenStorageKey);
    if (!token) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function restoreSession() {
      try {
        const me = await authApi.getProfile();
        if (!cancelled) {
          setUser(me);
        }
      } catch {
        localStorage.removeItem(tokenStorageKey);
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false); 
      }
    }
  }

    restoreSession();

    return function cleanup() {
      cancelled = true;
    };
  }, []);

  async function login(data: {email: string; password: string }) {
    const token = await authApi.login(data);
    localStorage.setItem(tokenStorageKey, token.access_token);
    const me = await authApi.getProfile();
    setUser(me);
  }

  function logout() {
    localStorage.removeItem(tokenStorageKey);
    setUser(null);
  }

  async function register(data: authApi.RegisterBody) {
    await authApi.register(data);
    await login({email: data.email, password: data.password });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isAdmin: user?.is_admin === true,
        login,
        logout,
        register,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
