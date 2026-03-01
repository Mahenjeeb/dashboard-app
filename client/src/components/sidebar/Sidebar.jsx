import { useMemo, useState } from "react";
import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { NavLink, Outlet, useLocation } from "react-router";
import sidebarMenuItems from "@/data/sidebarMenuItems";
import Logo from "@/components/dashboard/Logo";
import { useUser } from "@/context/UserContext";

const drawerWidth = 290;

const Sidebar = () => {
  const { user } = useUser();
  const role = user?.user?.role;
  const email = user?.user?.email;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const availableMenuItems = useMemo(() => {
    return sidebarMenuItems.filter(
      (item) => !(role !== "SUPER_ADMIN" && item.isAdmin),
    );
  }, [role]);

  const drawerContent = (
    <Box sx={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <Logo />
      <Divider />
      <List sx={{ px: 1.5, py: 2, display: "grid", gap: 0.5 }}>
        {availableMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.url ||
            location.pathname.startsWith(`${item.url}/`);

          return (
            <ListItemButton
              key={item.text}
              component={NavLink}
              to={item.url}
              onClick={() => setMobileOpen(false)}
              sx={(theme) => ({
                borderRadius: 2,
                color: isActive ? "primary.main" : "text.secondary",
                backgroundColor: isActive
                  ? alpha(theme.palette.primary.main, 0.1)
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive
                    ? alpha(theme.palette.primary.main, 0.16)
                    : alpha(theme.palette.primary.main, 0.08),
                },
              })}
            >
              <ListItemIcon
                sx={{
                  minWidth: 38,
                  color: "inherit",
                }}
              >
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: "auto", px: 2, pb: 2.5 }}>
        <Paper
          sx={{
            px: 2,
            py: 1.75,
            borderRadius: 3,
            background:
              "linear-gradient(145deg, rgba(37,99,235,0.15), rgba(14,165,233,0.12))",
            border: "1px solid rgba(37,99,235,0.18)",
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 0.25 }}>
            Keep things secure
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Manage users, invitations, and environment settings from one place.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ gap: 1.5 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen((prev) => !prev)}
            sx={{ display: { md: "none" } }}
          >
            <MenuRoundedIcon />
          </IconButton>

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
              Admin Dashboard
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Workspace control panel
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Chip
            size="small"
            color="primary"
            variant="outlined"
            label={(role || "USER").replaceAll("_", " ")}
          />

          <Tooltip title={email || "User"}>
            <Avatar sx={{ bgcolor: "primary.main", width: 38, height: 38 }}>
              {(email?.charAt(0) || "A").toUpperCase()}
            </Avatar>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="dashboard navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          px: { xs: 2, sm: 3 },
          py: 3,
          pt: { xs: 11, md: 12 },
        }}
      >
        <Box sx={{ maxWidth: 1320, mx: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
