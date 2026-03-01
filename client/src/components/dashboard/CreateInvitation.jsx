import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useMutation } from "@tanstack/react-query";
import { interceptorAPI } from "@/api/interceptorAPI";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";
import AuthLockOverlay from "./AuthLockOverlay";
import AppButton from "@/components/common/AppButton";
import AppTextField from "@/components/common/AppTextField";

const defaultInvitation = {
  email: "",
  roleForUser: "",
};

const allowedRoles = ["SUPER_ADMIN", "USER"];

const CreateInvitation = ({ isOpen }) => {
  const { isAuthenticated } = useUser();
  const [invitation, setInvitation] = useState(defaultInvitation);
  const [errors, setErrors] = useState({ email: "", roleForUser: "" });
  const instance = interceptorAPI();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload) => {
      const response = await instance.post("app/create-invitation", payload);
      return response.data;
    },
    onSuccess: (data) => {
      const message = data?.message || "Invitation request processed";
      const normalizedMessage = message.toLowerCase();

      if (
        normalizedMessage.includes("already exisits") ||
        normalizedMessage.includes("already exists") ||
        normalizedMessage.includes("please contact")
      ) {
        toast.error(message);
        return;
      }

      if (normalizedMessage.includes("successfully")) {
        toast.success(message);
        setInvitation(defaultInvitation);
        setErrors({ email: "", roleForUser: "" });
        return;
      }

      toast(message);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to create invitation. Try again later",
      );
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInvitation((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = { email: "", roleForUser: "" };
    let isValid = true;

    const email = invitation.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      nextErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!invitation.roleForUser) {
      nextErrors.roleForUser = "Role is required";
      isValid = false;
    } else if (!allowedRoles.includes(invitation.roleForUser)) {
      nextErrors.roleForUser = "Role is invalid";
      isValid = false;
    }

    setErrors(nextErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in to create invitations");
      return;
    }

    if (!validate()) {
      return;
    }

    mutate({
      email: invitation.email.trim().toLowerCase(),
      roleForUser: invitation.roleForUser,
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Card>
        <CardContent sx={{ p: { xs: 2, md: 2.25 } }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6">Invite Team Member</Typography>
              <Typography variant="body2" color="text.secondary">
                Send a secure invitation to grant access to your workspace.
              </Typography>
            </Box>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                display: "grid",
                gap: 1.25,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "minmax(0, 1.5fr) minmax(0, 1fr)",
                },
                alignItems: "start",
              }}
            >
              <AppTextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={invitation.email}
                onChange={handleInputChange}
                error={Boolean(errors.email)}
                helperText={errors.email || undefined}
                disabled={isPending || !isAuthenticated}
                sx={{
                  gridColumn: { xs: "1", sm: "1 / 2" },
                }}
              />

              <FormControl
                fullWidth
                error={Boolean(errors.roleForUser)}
                size="small"
                sx={{ gridColumn: { xs: "1", sm: "2 / 3" } }}
              >
                <InputLabel id="invitation-role-label">Role</InputLabel>
                <Select
                  labelId="invitation-role-label"
                  label="Role"
                  name="roleForUser"
                  value={invitation.roleForUser}
                  onChange={handleInputChange}
                  disabled={isPending || !isAuthenticated}
                >
                  <MenuItem value="SUPER_ADMIN">Admin</MenuItem>
                  <MenuItem value="USER">User</MenuItem>
                </Select>
                {Boolean(errors.roleForUser) && (
                  <FormHelperText sx={{ mt: 0.5, mx: 0 }}>{errors.roleForUser}</FormHelperText>
                )}
              </FormControl>

              <AppButton
                type="submit"
                size="large"
                disabled={isPending || !isAuthenticated}
                startIcon={<SendRoundedIcon />}
                sx={{
                  gridColumn: { xs: "1", sm: "1 / -1" },
                  justifySelf: { xs: "stretch", sm: "end" },
                  width: { xs: "100%", sm: "auto" },
                  minWidth: { xs: "100%", sm: 160 },
                  height: 36,
                  mt: { xs: 0.25, sm: 0.5 },
                }}
              >
                {isPending ? "Inviting..." : "Send Invite"}
              </AppButton>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      {!isAuthenticated && (
        <AuthLockOverlay
          title="Invitations are locked"
          description="Preview is available. Sign in to invite users."
          ctaTo="?auth=signin"
        />
      )}
    </Box>
  );
};

export default CreateInvitation;
