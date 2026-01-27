import instance from "@/services/auth_service";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    instance.get("/me")
      .then(() => setOk(true))
      .catch(() => setOk(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <><div>Loading...</div></>;
  return ok ? <Outlet /> : <Navigate to="/signup" />;
};

export default ProtectedRoute;