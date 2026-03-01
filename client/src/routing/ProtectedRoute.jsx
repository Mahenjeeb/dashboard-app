import { Box, CircularProgress } from "@mui/material";
import { useUser } from "@/context/UserContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
