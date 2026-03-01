import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { interceptorAPI } from "@/api/interceptorAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  alpha,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AppButton from "@/components/common/AppButton";
import AppTextField from "@/components/common/AppTextField";

const defaultFormData = { email: "", password: "" };

const AuthDialog = ({
  open,
  mode = "signin",
  onModeChange,
  onClose,
  onPendingChange,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const apiInstance = useMemo(() => interceptorAPI(), []);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(defaultFormData);

  const isSignIn = mode !== "signup";
  const endpoint = isSignIn ? "login" : "signup";
  const heading = isSignIn ? "Sign in to your account" : "Create your account";
  const accent = theme.palette.primary.main;
  const textPrimary = theme.palette.text.primary;
  const textSecondary = theme.palette.text.secondary;

  const { mutate, isPending } = useMutation({
    mutationKey: ["userAuthDialog", endpoint],
    mutationFn: async (payload) => {
      const response = await apiInstance.post(`/auth/${endpoint}`, payload);
      return response.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["authMe"] });
      toast.success(data?.message || (isSignIn ? "Signed in" : "Account created"));
      handleClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Authentication failed");
    },
  });

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  const handleClose = () => {
    setFormData(defaultFormData);
    onClose?.();
  };

  const handleModeSwitch = (nextMode) => {
    setFormData(defaultFormData);
    onModeChange?.(nextMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPending) return;
    mutate({
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!isPending) handleClose();
      }}
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          backgroundColor: "#FFFFFF",
          color: textPrimary,
          border: "1px solid rgba(37,99,235,0.2)",
          boxShadow: "0 12px 30px rgba(37,99,235,0.14)",
          width: "100%",
        },
      }}
    >
      <DialogTitle sx={{ px: { xs: 2, sm: 2.5 }, pt: 1.75, pb: 0.75 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{
              fontSize: 13,
              letterSpacing: "0.08em",
              fontWeight: 700,
              textTransform: "uppercase",
              color: alpha(accent, 0.9),
            }}
          >
            Account Access
          </Typography>
          <IconButton
            aria-label="Close authentication dialog"
            disabled={isPending}
            onClick={handleClose}
            sx={{ color: alpha(theme.palette.primary.main, 0.8) }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 2, sm: 2.5 }, pb: 2.25, pt: 0.25 }}>
        <Stack spacing={1.75} sx={{ maxWidth: 540, mx: "auto" }}>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: 26, sm: 30 },
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: textPrimary,
                mb: 0.5,
              }}
            >
              {heading}
            </Typography>
            <Typography sx={{ color: textSecondary }}>
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <Link
                component="button"
                type="button"
                onClick={() => handleModeSwitch(isSignIn ? "signup" : "signin")}
                disabled={isPending}
                underline="hover"
                sx={{
                  color: accent,
                  fontWeight: 700,
                  textDecorationColor: alpha(accent, 0.5),
                }}
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </Link>
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={1}>
              <AppTextField
                name="email"
                type="email"
                label="Email"
                required
                fullWidth
                disabled={isPending}
                value={formData.email}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, email: event.target.value }))
                }
              />
              <AppTextField
                name="password"
                type="password"
                label="Password"
                required
                fullWidth
                disabled={isPending}
                value={formData.password}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, password: event.target.value }))
                }
              />
              <AppButton
                type="submit"
                size="large"
                disabled={isPending}
                startIcon={isPending ? <CircularProgress size={16} color="inherit" /> : null}
                sx={{
                  mt: 0.5,
                  minHeight: 40,
                }}
              >
                {isPending
                  ? isSignIn
                    ? "Signing in..."
                    : "Creating account..."
                  : isSignIn
                    ? "Sign In"
                    : "Create Account"}
              </AppButton>
            </Stack>
          </Box>

          <Typography
            sx={{
              textAlign: "center",
              color: textSecondary,
              fontSize: 13,
              pt: 0.25,
            }}
          >
            By continuing, you agree to the{" "}
            <Box component="span" sx={{ color: accent, fontWeight: 700 }}>
              Terms of Service
            </Box>{" "}
            and{" "}
            <Box component="span" sx={{ color: accent, fontWeight: 700 }}>
              Privacy Policy
            </Box>
            .
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
