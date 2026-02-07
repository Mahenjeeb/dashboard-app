import { useUser } from "@/context/UserContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useUser();
  if (isLoading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
