import { alpha, createTheme } from "@mui/material/styles";

const primaryMain = "#2563EB";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primaryMain,
      light: "#60A5FA",
      dark: "#1D4ED8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#0EA5E9",
      light: "#38BDF8",
      dark: "#0284C7",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#10B981",
    },
    warning: {
      main: "#F59E0B",
    },
    error: {
      main: "#EF4444",
    },
    background: {
      default: "#F3F7FB",
      paper: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily:
      '"Segoe UI", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.08), transparent 42%), radial-gradient(circle at 100% 0%, rgba(14, 165, 233, 0.08), transparent 36%), #F3F7FB",
          color: "#0F172A",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(15, 23, 42, 0.06)",
          boxShadow: "0px 14px 30px rgba(15, 23, 42, 0.08)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha("#FFFFFF", 0.8),
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
          boxShadow: "none",
          color: "#0F172A",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid rgba(15, 23, 42, 0.08)",
          backgroundColor: alpha("#FFFFFF", 0.92),
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          fontWeight: 600,
          boxShadow: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});
