import { Navigate, Outlet } from "react-router";
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return <>{token ? <Outlet /> : <Navigate to="/signup" replace/>}</>;
};

export default ProtectedRoute;
