/* eslint-disable react-refresh/only-export-components */
import { interceptorAPI } from "@/api/interceptorAPI";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const instance = interceptorAPI();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["authRes"],
    queryFn: async () => await instance.get("/auth/me"),
  });
  return (
    <UserContext.Provider value={{ data, isError, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) return console.log("useToken must be inside TokenProvider");
  return context;
};
