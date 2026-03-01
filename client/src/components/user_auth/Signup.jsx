import { useState } from "react";
import toast from "react-hot-toast";
import { interceptorAPI } from "@/api/interceptorAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";

const Signup = () => {
  const defaultFormData = { email: "", password: "" };
  const [formData, setFormData] = useState(defaultFormData);
  const [isSignIn, setSignIn] = useState(true);

  const url = isSignIn ? "login" : "signup";
  const apiInstance = interceptorAPI();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["userAuth", url],
    mutationFn: async (payload) => {
      const response = await apiInstance.post(`/auth/${url}`, payload);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries(["authMe"]);
      navigate("/users", { replace: true });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Authentication failed");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPending) {
      return;
    }

    mutate(formData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        py: 4,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 460 }}>
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={2.25}>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  mx: "auto",
                  mb: 1.25,
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,0.16), rgba(14,165,233,0.16))",
                  color: "primary.main",
                }}
              >
                <AdminPanelSettingsRoundedIcon />
              </Box>
              <Typography variant="h5">
                {isSignIn ? "Welcome Back" : "Create Admin Account"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isSignIn
                  ? "Sign in to continue to your workspace dashboard"
                  : "Register and start managing users securely"}
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={1.75}>
                <TextField
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  label="Email"
                  placeholder="mail@site.com"
                  required
                  disabled={isPending}
                  fullWidth
                />

                <TextField
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  label="Password"
                  required
                  disabled={isPending}
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isPending}
                  startIcon={
                    isPending ? <CircularProgress color="inherit" size={16} /> : null
                  }
                >
                  {isPending
                    ? "Please wait..."
                    : isSignIn
                      ? "Sign In"
                      : "Create Account"}
                </Button>
              </Stack>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
              {isSignIn ? "New user?" : "Already have an account?"}{" "}
              <Button
                variant="text"
                size="small"
                sx={{ textTransform: "none", fontWeight: 700 }}
                onClick={() => {
                  setSignIn((prev) => !prev);
                  setFormData(defaultFormData);
                }}
              >
                {isSignIn ? "Register now" : "Sign in"}
              </Button>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
