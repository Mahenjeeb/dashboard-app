import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link, useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();

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
      <Paper sx={{ maxWidth: 640, width: "100%", p: { xs: 3, md: 4 }, textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 84, md: 128 },
            lineHeight: 1,
            color: "primary.main",
            mb: 1,
          }}
        >
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 1.25 }}>
          Page Not Found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          The page you requested is unavailable or the route no longer exists.
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
          <Button component={Link} to="/users" variant="contained" startIcon={<HomeRoundedIcon />}>
            Go to Dashboard
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)} startIcon={<ArrowBackRoundedIcon />}>
            Go Back
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default PageNotFound;
