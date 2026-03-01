import { useEffect, useEffectEvent, useMemo, useState } from "react";
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
const authModeConfig = {
  signin: {
    endpoint: "login",
    heading: "Sign In",
    submitLabel: "Sign In",
    pendingLabel: "Signing in...",
    switchPrompt: "Don't have an account?",
    switchLabel: "Sign Up",
    nextMode: "signup",
  },
  signup: {
    endpoint: "signup",
    heading: "Sign Up",
    submitLabel: "Sign Up",
    pendingLabel: "Signing up...",
    switchPrompt: "Already have an account?",
    switchLabel: "Sign In",
    nextMode: "signin",
  },
};

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
  const currentMode = mode === "signup" ? "signup" : "signin";
  const modeConfig = authModeConfig[currentMode];

  const accent = theme.palette.primary.main;
  const textPrimary = theme.palette.text.primary;
  const textSecondary = theme.palette.text.secondary;
  const notifyPendingChange = useEffectEvent((pending) => {
    onPendingChange?.(pending);
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["userAuthDialog", modeConfig.endpoint],
    mutationFn: async (payload) => {
      const response = await apiInstance.post(`/auth/${modeConfig.endpoint}`, payload);
      return response.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["authMe"] });
      toast.success(data?.message || (currentMode === "signin" ? "Signed in" : "Account created"));
      handleClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Authentication failed");
    },
  });

  useEffect(() => {
    notifyPendingChange(isPending);
  }, [isPending]);

  const handleClose = () => {
    setFormData(defaultFormData);
    onClose?.();
  };

  const handleModeSwitch = (nextMode) => {
    setFormData(defaultFormData);
    onModeChange?.(nextMode);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      <DialogTitle sx={{ px: { xs: 2, sm: 2.5 }, pt: 1.25, pb: 0 }}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
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
      <DialogContent
        sx={{ px: { xs: 2, sm: 2.5 }, pb: 2.25, pt: 0.5, display: "flex", justifyContent: "center" }}
      >
        <Stack spacing={1.75} sx={{ width: "100%", maxWidth: 420, mx: "auto", alignItems: "center" }}>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: { xs: 22, sm: 24 },
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: textPrimary,
                mb: 0.25,
              }}
            >
              {modeConfig.heading}
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <Stack spacing={1}>
              <AppTextField
                name="email"
                type="email"
                label="Email"
                required
                fullWidth
                disabled={isPending}
                value={formData.email}
                onChange={handleInputChange}
              />
              <AppTextField
                name="password"
                type="password"
                label="Password"
                required
                fullWidth
                disabled={isPending}
                value={formData.password}
                onChange={handleInputChange}
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
                  ? modeConfig.pendingLabel
                  : modeConfig.submitLabel}
              </AppButton>
            </Stack>
          </Box>
          <Typography
            sx={{
              width: "100%",
              textAlign: "center",
              color: textSecondary,
              fontSize: 12,
              lineHeight: 1.35,
            }}
          >
            {modeConfig.switchPrompt}{" "}
            <Link
              component="button"
              type="button"
              onClick={() => handleModeSwitch(modeConfig.nextMode)}
              disabled={isPending}
              underline="hover"
              sx={{
                color: accent,
                fontSize: 12,
                fontWeight: 700,
                textDecorationColor: alpha(accent, 0.5),
              }}
            >
              {modeConfig.switchLabel}
            </Link>
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
