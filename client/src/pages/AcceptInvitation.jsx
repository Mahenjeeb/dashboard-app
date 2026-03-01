import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { interceptorAPI } from "@/api/interceptorAPI";
import { useNavigate, useSearchParams } from "react-router";

const AcceptInvitations = () => {
  const [searchParams] = useSearchParams();
  const itoken = searchParams.get("itoken");
  const instance = interceptorAPI();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const confirmPasswordRef = useRef(null);

  const syncConfirmPasswordValidity = (
    currentPassword = password,
    currentConfirmPassword = confirmPassword,
  ) => {
    if (!confirmPasswordRef.current) return;

    if (
      currentConfirmPassword.length > 0 &&
      currentPassword !== currentConfirmPassword
    ) {
      confirmPasswordRef.current.setCustomValidity("Passwords do not match");
      return;
    }

    confirmPasswordRef.current.setCustomValidity("");
  };

  const validateFields = () => {
    const nextErrors = { password: "", confirmPassword: "" };
    let isValid = true;

    if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (confirmPassword.length < 6) {
      nextErrors.confirmPassword = "Confirm password must be at least 6 characters";
      isValid = false;
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFieldErrors(nextErrors);
    return isValid;
  };

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: async () => {
      const response = await instance.post(`app/accept?itoken=${itoken}`, {
        password,
      });
      return response.data;
    },
    onError: (err) => {
      setLocalError(err.response?.data?.message || err.message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalError("");

    syncConfirmPasswordValidity(password, confirmPassword);

    if (!validateFields()) {
      return;
    }

    mutate();
  };

  if (!itoken) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "100vh", p: 2 }}>
        <Alert severity="error">Invalid invitation link.</Alert>
      </Box>
    );
  }

  if (isSuccess) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "100vh", p: 2 }}>
        <Card sx={{ maxWidth: 460, width: "100%" }}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <CheckCircleRoundedIcon color="success" sx={{ fontSize: 54, mb: 1.5 }} />
            <Typography variant="h5" sx={{ mb: 1 }}>
              Password Set Successfully
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Your invitation has been accepted. You can now sign in.
            </Typography>
            <Button variant="contained" onClick={() => navigate("/signup", { replace: true })}>
              Go to Sign In
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: "100vh", p: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 460 }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Stack spacing={2.5}>
            <Box sx={{ textAlign: "center" }}>
              <LockRoundedIcon color="primary" sx={{ fontSize: 34 }} />
              <Typography variant="h5" sx={{ mt: 1 }}>
                Set Your Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create a secure password to activate your account.
              </Typography>
            </Box>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Stack spacing={1.75}>
                <TextField
                  type="password"
                  label="New Password"
                  value={password}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    setPassword(nextValue);
                    setFieldErrors((prev) => ({ ...prev, password: "" }));
                    syncConfirmPasswordValidity(nextValue, confirmPassword);
                  }}
                  error={Boolean(fieldErrors.password)}
                  helperText={fieldErrors.password || "Use at least 6 characters"}
                  disabled={isPending}
                  fullWidth
                />

                <TextField
                  inputRef={confirmPasswordRef}
                  type="password"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    setConfirmPassword(nextValue);
                    setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
                    syncConfirmPasswordValidity(password, nextValue);
                  }}
                  error={Boolean(fieldErrors.confirmPassword)}
                  helperText={fieldErrors.confirmPassword || "Retype your password"}
                  disabled={isPending}
                  fullWidth
                />

                {(localError || error) && (
                  <Alert severity="error">
                    {localError || error?.response?.data?.message || error?.message}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isPending}
                  startIcon={
                    isPending ? <CircularProgress color="inherit" size={16} /> : null
                  }
                >
                  {isPending ? "Saving..." : "Set Password"}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AcceptInvitations;
