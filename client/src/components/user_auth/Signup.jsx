import { useState } from "react";
import toast from "react-hot-toast";
import { interceptorAPI } from "@/api/interceptorAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { Box, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import AppButton from "@/components/common/AppButton";
import AppTextField from "@/components/common/AppTextField";

const defaultFormData = { email: "", password: "" };

const Signup = () => {
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
          <Stack spacing={2.25} alignItems="center">
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: { xs: 22, sm: 24 }, lineHeight: 1.1, fontWeight: 700 }}>
                {isSignIn ? "Sign In" : "Sign Up"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use your email and password.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
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
                    ? isSignIn
                      ? "Signing in..."
                      : "Signing up..."
                    : isSignIn
                      ? "Sign In"
                      : "Sign Up"}
                </AppButton>
              </Stack>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
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
                {isSignIn ? "Sign Up" : "Sign In"}
                {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
              </AppButton>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
