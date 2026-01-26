import tokenManager from "@/util/tokenManager";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const [token, setToken] = useState(tokenManager.getAccessToken());
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Reload token from localStorage in case it was manually deleted
        tokenManager.reloadToken();
        let currentToken = tokenManager.getAccessToken();
        if (!currentToken) {
          console.log("No token found, attempting refresh...");
          await tokenManager.refreshToken();
          currentToken = tokenManager.getAccessToken();
          toast.success("Session restored");
        }
        setToken(currentToken);
      } catch (error) {
        console.error("Auth init failed:", error);
        toast.error("Please login again");
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []); // Empty dependency array - run only once on mount
  if (isLoading) {
    return <div>Loading...</div>; // or your loading spinner
  }
  return <>{token ? <Outlet /> : <Navigate to="/signup" replace />}</>;
};

export default ProtectedRoute;