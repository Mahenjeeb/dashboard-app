import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { useInterceptorAPI } from "@/hooks/useInterceptorAPI";
const ProtectedRoute = () => {
  const privateInterceptor = useInterceptorAPI();
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const resp = await privateInterceptor.get("/auth/me");
        if (resp.status === 200) {
          setIsValid(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading while checking
  return <>{isValid ? <Outlet /> : <Navigate to="/signup" />}</>;
};
export default ProtectedRoute;