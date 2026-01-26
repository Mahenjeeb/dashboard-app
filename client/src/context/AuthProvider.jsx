/* eslint-disable react-refresh/only-export-components */

import getSetAccessToken from "@/util/getSetAccessToken";
import { createContext, useContext } from "react";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const { getAccessToken } = getSetAccessToken();
  const token = getAccessToken();
  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};