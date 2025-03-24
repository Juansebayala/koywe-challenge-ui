"use client";

import { createContext, useContext, useCallback, ReactNode } from "react";
import { TokenResponse } from "@/types/auth";
import { storage } from "@/lib/storage";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (tokenData: TokenResponse) => void;
  logout: () => void;
  getAuthHeader: () => string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const login = useCallback((tokenData: TokenResponse) => {
    storage.saveToken(tokenData);
  }, []);

  const logout = useCallback(() => {
    storage.clearTokens();
  }, []);

  const getAuthHeader = useCallback((): string | null => {
    const token = storage.getAccessToken();
    return token ? `Bearer ${token}` : null;
  }, []);

  const isAuthenticated = storage.isAuthenticated();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
