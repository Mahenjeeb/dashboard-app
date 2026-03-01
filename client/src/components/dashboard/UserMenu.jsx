import Menu from "@mui/material/Menu";
import { useMemo, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import {
  Avatar,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useUser } from "@/context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { interceptorAPI } from "@/api/interceptorAPI";
import toast from "react-hot-toast";
import AppButton from "@/components/common/AppButton";
import { AUTH_ENTRY_LABEL } from "@/constants/auth-ui";

const UserMenu = ({ onOpenAuth, isAuthBusy = false }) => {
  const { user, isAuthenticated } = useUser();
  const apiInstance = useMemo(() => interceptorAPI(), []);
  const queryClient = useQueryClient();
  const role = user?.user?.role?.replaceAll("_", " ") ?? "USER";
  const roleLabel = role
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const email = user?.user?.email ?? "user@workspace.com";
  const initial = email?.charAt(0)?.toUpperCase() ?? "U";

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationKey: ["authLogout"],
    mutationFn: async () => {
      try {
        const response = await apiInstance.post("/auth/logout");
        return response.data;
      } catch (error) {
        if (error.response?.status === 404 || error.response?.status === 405) {
          const fallbackResponse = await apiInstance.get("/auth/logout");
          return fallbackResponse.data;
        }
        throw error;
      }
    },
    onSuccess: async () => {
      await queryClient.setQueryData(["authMe"], null);
      await queryClient.invalidateQueries({ queryKey: ["authMe"] });
      toast.success("Logged out");
      setAnchorEl(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Logout failed");
    },
  });

  if (!isAuthenticated) {
    return (
      <Stack direction="row" spacing={0.75} alignItems="center">
        {isAuthBusy && <CircularProgress size={18} />}
        <AppButton
          variant="contained"
          size="small"
          disabled={isAuthBusy}
          onClick={() => onOpenAuth?.("signin")}
          sx={{ minWidth: { xs: 132, sm: 152 }, height: 32, px: { xs: 1.25, sm: 1.5 } }}
        >
          {AUTH_ENTRY_LABEL}
        </AppButton>
      </Stack>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", sm: "inline-flex" },
          alignItems: "center",
          gap: 0.5,
          mr: 1,
          px: 1.1,
          height: 32,
          border: "1px solid rgba(15, 23, 42, 0.14)",
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
          boxShadow: "none",
        }}
      >
        <ShieldRoundedIcon sx={{ fontSize: 14, color: "primary.main" }} />
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {roleLabel}
        </Typography>
      </Box>
      <Avatar
        variant="rounded"
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: 8,
          width: 36,
          height: 36,
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 700,
          color: "primary.main",
          border: "1px solid rgba(37, 99, 235, 0.45)",
          boxShadow: "0 3px 10px rgba(15, 23, 42, 0.12)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 5px 14px rgba(15, 23, 42, 0.18)",
          },
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {isLogoutPending ? <CircularProgress size={16} color="inherit" /> : initial}
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={handleClose} disabled>
          {email}
        </MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem
          disabled={isLogoutPending}
          onClick={() => {
            logout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
