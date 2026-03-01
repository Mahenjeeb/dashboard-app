import { useMemo, useState } from "react";
import {
  AppBar,
  Breadcrumbs,
  Box,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import {
  Link as RouterLink,
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router";
import sidebarMenuItems from "@/data/sidebarMenuItems";
import Logo from "@/components/dashboard/Logo";
import { useUser } from "@/context/UserContext";
import UserMenu from "../dashboard/UserMenu";
import AuthDialog from "@/components/user_auth/AuthDialog";

const expandedDrawerWidth = 240;
const collapsedDrawerWidth = 72;

const Sidebar = () => {
  const { user } = useUser();
  const role = user?.user?.role;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [isAuthBusy, setAuthBusy] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const availableMenuItems = useMemo(() => {
    return sidebarMenuItems.filter(
      (item) => !(role !== "SUPER_ADMIN" && item.isAdmin),
    );
  }, [role]);

  const currentDesktopDrawerWidth = desktopCollapsed
    ? collapsedDrawerWidth
    : expandedDrawerWidth;

  const authParam = searchParams.get("auth");
  const isAuthDialogOpen = authParam === "signin" || authParam === "signup";
  const authMode = authParam === "signup" ? "signup" : "signin";

  const openAuthDialog = (mode = "signin") => {
    const next = new URLSearchParams(searchParams);
    next.set("auth", mode === "signup" ? "signup" : "signin");
    setSearchParams(next);
  };

  const closeAuthDialog = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("auth");
    setSearchParams(next, { replace: true });
  };

  const breadcrumbItems = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const fromMenu = sidebarMenuItems.find((item) => item.url === href)?.text;
      const fallback = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return {
        href,
        label: fromMenu || fallback,
        isLast: index === segments.length - 1,
      };
    });
  }, [location.pathname]);

  const drawerContent = (collapsed = false) => (
    <Box sx={{ display: "flex", height: "100%", flexDirection: "column" }}>
      <Logo collapsed={collapsed} />
      <Divider />
      <List sx={{ px: 1, py: 1.5, display: "grid", gap: 0.5 }}>
        {availableMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.url ||
            location.pathname.startsWith(`${item.url}/`);

          const navItem = (
            <ListItemButton
              key={item.text}
              component={NavLink}
              to={item.url}
              onClick={() => setMobileOpen(false)}
              sx={{
                minHeight: 42,
                px: collapsed ? 0 : 1.25,
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: 0,
                color: isActive ? "primary.main" : "text.secondary",
                backgroundColor: isActive ? "rgba(37, 99, 235, 0.1)" : "transparent",
                "&:hover": {
                  backgroundColor: isActive ? "rgba(37, 99, 235, 0.14)" : "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 0 : 1.25,
                  color: "inherit",
                  justifyContent: "center",
                }}
              >
                <Icon fontSize="small" />
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: isActive ? 700 : 500,
                  }}
                />
              )}
            </ListItemButton>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.text} title={item.text} placement="right">
                {navItem}
              </Tooltip>
            );
          }

          return (
            <Box key={item.text}>
              {navItem}
            </Box>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${currentDesktopDrawerWidth}px)` },
          ml: { md: `${currentDesktopDrawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 56, sm: 60 },
            px: { xs: 1.25, sm: 2 },
            gap: 1,
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen((prev) => !prev)}
            sx={{ display: { md: "none" } }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => setDesktopCollapsed((prev) => !prev)}
            sx={{ display: { xs: "none", md: "inline-flex" } }}
            aria-label={desktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {desktopCollapsed ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <UserMenu onOpenAuth={openAuthDialog} isAuthBusy={isAuthBusy} />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: currentDesktopDrawerWidth }, flexShrink: { md: 0 } }}
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
              width: expandedDrawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent(false)}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: currentDesktopDrawerWidth,
              boxSizing: "border-box",
              overflowX: "hidden",
            },
          }}
        >
          {drawerContent(desktopCollapsed)}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${currentDesktopDrawerWidth}px)` },
          px: { xs: 1.25, sm: 2.25, md: 3 },
          py: { xs: 1.5, md: 2 },
          pt: { xs: 8, md: 8.5 },
        }}
      >
        <Box sx={{ maxWidth: 1320, mx: "auto", display: "grid", gap: 1.5 }}>
          <Breadcrumbs
            aria-label="page breadcrumb"
            sx={{
              fontSize: 13,
              color: "text.secondary",
              "& .MuiBreadcrumbs-separator": {
                mx: 0.75,
                color: "text.disabled",
              },
              "& .MuiBreadcrumbs-ol": {
                flexWrap: "wrap",
                rowGap: 0.25,
              },
            }}
          >
            <Link
              component={RouterLink}
              to="/users"
              color="inherit"
              underline="hover"
              sx={{ fontSize: 13 }}
            >
              Dashboard
            </Link>
            {breadcrumbItems.map((item) =>
              item.isLast ? (
                <Typography key={item.href} color="text.primary" sx={{ fontSize: 13 }}>
                  {item.label}
                </Typography>
              ) : (
                <Link
                  key={item.href}
                  component={RouterLink}
                  to={item.href}
                  color="inherit"
                  underline="hover"
                  sx={{ fontSize: 13 }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </Breadcrumbs>
          <Outlet />
        </Box>
      </Box>
      <AuthDialog
        open={isAuthDialogOpen}
        mode={authMode}
        onModeChange={openAuthDialog}
        onClose={closeAuthDialog}
        onPendingChange={setAuthBusy}
      />
    </Box>
  );
};

export default Sidebar;
