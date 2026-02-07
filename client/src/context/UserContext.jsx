/* eslint-disable react-refresh/only-export-components */
import { interceptorAPI } from "@/api/interceptorAPI";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const instance = useMemo(() => interceptorAPI(), []);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["authMe"],
    queryFn: async () => {
      const resp = await instance.get("/auth/me");
      return resp.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
  const isAuthenticated = !!data;
  const isSessionExpired = isError;
  return (
    <UserContext.Provider
      value={{ user: data, isLoading, isAuthenticated, isSessionExpired }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) return console.log("useToken must be inside TokenProvider");
  return context;
};
