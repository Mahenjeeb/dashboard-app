/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useInterceptorAPI } from "@/api/interceptorAPI";
const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const apiInstance = useInterceptorAPI();
  const [usrData, setUsrData] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await apiInstance.get("/app/me");
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
