import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore admin login from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ss-admin");
    if (saved === "true") {
      setUser({ role: "admin" });
    }
  }, []);

  // Login as admin
  const loginAsAdmin = () => {
    setUser({ role: "admin" });
    localStorage.setItem("ss-admin", "true");
  };

  // Logout admin
  const logoutAdmin = () => {
    setUser(null);
    localStorage.removeItem("ss-admin");
  };

  return (
    <AuthContext.Provider value={{ user, loginAsAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
