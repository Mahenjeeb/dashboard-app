/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext } from "react";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    // Trigger re-render by dispatching custom event
    window.dispatchEvent(new Event("tokenUpdated"));
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};