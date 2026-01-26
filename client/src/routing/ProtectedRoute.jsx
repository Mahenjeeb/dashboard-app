import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router";
const ProtectedRoute = () => {
  const token = useAuth();
  return <>{token ? <Outlet /> : <Navigate to="/signup" replace />}</>;
};

export default ProtectedRoute;
