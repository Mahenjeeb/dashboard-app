import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Box, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import AppButton from "@/components/common/AppButton";

const AuthLockOverlay = ({
  title = "Editing is locked",
  description = "Sign in or create an account to edit this section.",
  ctaLabel = "Sign In / Sign Up",
  ctaTo = "?auth=signin",
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        display: "grid",
        placeItems: "center",
        p: 2,
        backgroundColor: "rgba(243, 247, 251, 0.78)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Stack spacing={1.5} alignItems="center" sx={{ maxWidth: 320, textAlign: "center" }}>
        <LockRoundedIcon color="primary" />
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <AppButton
          component={RouterLink}
          to={ctaTo}
          size="small"
        >
          {ctaLabel}
        </AppButton>
      </Stack>
    </Box>
  );
};

export default AuthLockOverlay;
