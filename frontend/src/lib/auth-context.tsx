"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { setAccessToken, registerAuthFailureListener } from "./api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  country: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Déconnexion propre
  const logout = useCallback(async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Erreur BDD lors du logout:", err);
    }
    
    // Vider les états locaux
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("mbf_user_cache");
  }, []);

  // Charger la session de manière silencieuse (Silent Refresh) au démarrage
  useEffect(() => {
    let active = true;

    async function restoreSession() {
      // Charger le profil utilisateur depuis le cache local pour éviter le flash blanc (optimisation UX)
      const cachedUser = localStorage.getItem("mbf_user_cache");
      if (cachedUser) {
        try {
          setUser(JSON.parse(cachedUser));
        } catch {
          localStorage.removeItem("mbf_user_cache");
        }
      }

      try {
        const res = await fetch(`${API_BASE}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (res.ok && active) {
          const data = await res.json();
          setAccessToken(data.token);
          setUser(data.user);
          localStorage.setItem("mbf_user_cache", JSON.stringify(data.user));
        } else if (active) {
          // Token expiré ou absent
          setAccessToken(null);
          setUser(null);
          localStorage.removeItem("mbf_user_cache");
        }
      } catch (err) {
        console.error("Impossible de restaurer la session d'authentification:", err);
        if (active) {
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();
    
    // Écouter les échecs globaux d'authentification (ex: jeton révoqué)
    registerAuthFailureListener(() => {
      if (active) {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem("mbf_user_cache");
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Identifiants invalides");
    }

    const data = await res.json();
    setAccessToken(data.token);
    setUser(data.user);
    localStorage.setItem("mbf_user_cache", JSON.stringify(data.user));
  }, []);

  const adminLogin = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      if (res.status === 403) {
        throw new Error(data.message || "Accès refusé — compte non administrateur");
      }
      throw new Error(data.message || "Identifiants invalides");
    }

    const data = await res.json();
    setAccessToken(data.token);
    setUser(data.user);
    localStorage.setItem("mbf_user_cache", JSON.stringify(data.user));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return ctx;
}
