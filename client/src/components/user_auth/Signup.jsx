import { useState } from "react";
import toast from "react-hot-toast";
import { interceptorAPI } from "@/api/interceptorAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import {
  alpha,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import AppButton from "@/components/common/AppButton";
import AppTextField from "@/components/common/AppTextField";

const defaultFormData = { email: "", password: "" };

const Signup = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState(defaultFormData);
  const [isSignIn, setSignIn] = useState(() => searchParams.get("mode") !== "signup");

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
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
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
                <AppTextField
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

                <AppTextField
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  label="Password"
                  required
                  disabled={isPending}
                  fullWidth
                />

                <AppButton
                  type="submit"
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
                </AppButton>
              </Stack>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
              {isSignIn ? "New user?" : "Already have an account?"}{" "}
              <AppButton
                variant="text"
                size="small"
                color="primary"
                sx={{ textTransform: "none", fontWeight: 700 }}
                onClick={() => {
                  setSignIn((prev) => !prev);
                  setFormData(defaultFormData);
                }}
              >
                {isSignIn ? "Register now" : "Sign in"}
              </AppButton>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
