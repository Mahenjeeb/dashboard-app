import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Authrol Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main" }}>A</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
