import { useUser } from "@/context/UserContext";
import { Navigate, Outlet } from "react-router";
const ProtectedRoute = () => {
  const { data, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  return <>{data ? <Outlet /> : <Navigate to="/signup" />}</>;
};
export default ProtectedRoute;
