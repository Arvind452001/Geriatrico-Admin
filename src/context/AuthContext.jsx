"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { adminLogin } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // ================= INIT FROM LOCAL STORAGE ================= //
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ================= LOGIN ================= //
const login = async (email, password) => {
  try {
    setError(null);

    const response = await adminLogin(email, password);

    console.log("LOGIN RESPONSE:", response);

    // ❌ remove status check (not in response)

    const token = response.access_token;
    const userData = response.admin;

    if (!token) {
      throw new Error("Token not received");
    }

    // ✅ store
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);

    return response;
  } catch (err) {
    const errorMessage = err.message || "Login failed. Please try again.";
    setError(errorMessage);
    throw err;
  }
};

  // ================= LOGOUT ================= //
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login, logout, user, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ================= HOOK ================= //
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}