// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

// ✅ FIXED IMPORT 
import { auth } from "../firebase";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const ADMIN_EMAIL_FALLBACK =
    import.meta.env.VITE_ADMIN_EMAIL_FALLBACK || "admin@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        localStorage.removeItem("ss_admin_token");
        setLoading(false);
        return;
      }

      try {
        const tokenResult = await firebaseUser.getIdTokenResult(true);
        const claims = tokenResult.claims || {};

        let role = "user";
        if (claims.admin) role = "admin";
        else if (firebaseUser.email === ADMIN_EMAIL_FALLBACK) role = "admin";

        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || "",
          role,
          token: tokenResult.token,
          claims,
        };

        setUser(userData);
        localStorage.setItem("ss_admin_token", tokenResult.token);
      } catch (err) {
        console.error("AuthContext: failed to get token result", err);
        setUser(null);
        localStorage.removeItem("ss_admin_token");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [ADMIN_EMAIL_FALLBACK]);

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("ss_admin_token");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
