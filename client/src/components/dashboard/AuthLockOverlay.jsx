import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Box, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import AppButton from "@/components/common/AppButton";

const AuthLockOverlay = ({
  title = "Editing is locked",
  description = "Use the Sign In / Sign Up button in the navbar to edit this section.",
  ctaLabel = "Sign in / up",
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
        <Stack direction="row" spacing={1} alignItems="center">
          <LockRoundedIcon color="primary" />
          <AppButton
            component={RouterLink}
            to={ctaTo}
            size="small"
          >
            {ctaLabel}
          </AppButton>
        </Stack>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Stack>
    </Box>
  );
};

export default AuthLockOverlay;
