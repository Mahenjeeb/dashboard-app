import { Box, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { Link as RouterLink } from "react-router";

const Logo = ({ collapsed = false }) => {
  return (
    <Box
      component={RouterLink}
      to="/users"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: 1,
        px: collapsed ? 1 : 1.5,
        py: 1.5,
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: 0,
          display: "grid",
          placeItems: "center",
          backgroundColor: "primary.main",
          color: "#FFFFFF",
        }}
      >
        <AutoAwesomeRoundedIcon fontSize="small" />
      </Box>
      {!collapsed && (
        <Typography variant="subtitle1" sx={{ lineHeight: 1.1, color: "text.primary" }}>
          Authrol
        </Typography>
      )}
    </Box>
  );
};

export default Logo;
