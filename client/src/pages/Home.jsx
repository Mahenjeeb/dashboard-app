import { Box, Paper, Stack, Typography } from "@mui/material";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";

const Home = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={1.5}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InsightsRoundedIcon color="primary" />
          <Typography variant="h5">Dashboard Overview</Typography>
        </Box>
        <Typography color="text.secondary">
          Use the sidebar to manage users, invitations, and environment settings.
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Home;
