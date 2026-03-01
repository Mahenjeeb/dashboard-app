import { Box, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { Link as RouterLink } from "react-router";

const Logo = () => {
  return (
    <Box
      component={RouterLink}
      to="/users"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        px: 2.5,
        py: 2.25,
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          background: "linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)",
          color: "#FFFFFF",
          boxShadow: "0 8px 16px rgba(37, 99, 235, 0.35)",
        }}
      >
        <AutoAwesomeRoundedIcon fontSize="small" />
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ lineHeight: 1.1, color: "text.primary" }}>
          Authrol
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Admin Console
        </Typography>
      </Box>
    </Box>
  );
};

export default Logo;
