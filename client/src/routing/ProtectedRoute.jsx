import tokenManager from "@/util/tokenManager";
import { Navigate, Outlet } from "react-router";
const ProtectedRoute = () => {
  const token = tokenManager.getAccessToken();
  return <>{token ? <Outlet /> : <Navigate to="/signup" replace />}</>;
};

export default ProtectedRoute;
