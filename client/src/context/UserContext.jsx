/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useInterceptorAPI } from "@/hooks/useInterceptorAPI";
const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const privateInterceptor = useInterceptorAPI();
  const [usrData, setUsrData] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await privateInterceptor.get("/app/me");
      setUsrData(data);
    })();
  }, []);
  return (
    <UserContext.Provider value={{ usrData }}>{children}</UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) return console.log("useToken must be inside TokenProvider");
  return context;
};
