import { createTheme } from "@mui/material/styles";

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
      default: "#F7F8FA",
      paper: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: 8,
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
        html: {
          scrollbarWidth: "thin",
          scrollbarColor: "#BFC5CE #EEF1F4",
        },
        body: {
          backgroundColor: "#F7F8FA",
          color: "#0F172A",
        },
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: "#BFC5CE #EEF1F4",
        },
        "*::-webkit-scrollbar": {
          width: 7,
          height: 7,
        },
        "*::-webkit-scrollbar-track": {
          background: "#EEF1F4",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#BFC5CE",
          borderRadius: 8,
          border: "1px solid #EEF1F4",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#AAB2BD",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(15, 23, 42, 0.08)",
          boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(15, 23, 42, 0.08)",
          boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
          boxShadow: "none",
          color: "#0F172A",
          borderRadius: 0,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid rgba(15, 23, 42, 0.08)",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
          minHeight: 34,
          padding: "6px 12px",
          boxShadow: "0 1px 2px rgba(15, 23, 42, 0.12)",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.14)",
          },
        },
        sizeSmall: {
          minHeight: 30,
          padding: "4px 10px",
        },
        sizeLarge: {
          minHeight: 38,
          padding: "7px 14px",
        },
        outlined: {
          boxShadow: "none",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "14px",
          "&:last-child": {
            paddingBottom: "14px",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
          color: "#0F172A",
          "& fieldset": {
            borderColor: "rgba(15, 23, 42, 0.66)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(15, 23, 42, 0.86)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "rgba(15, 23, 42, 0.96)",
          },
          "& .MuiInputBase-input": {
            padding: "8px 10px",
            color: "#0F172A",
            "&::placeholder": {
              color: "rgba(51, 65, 85, 0.62)",
              opacity: 1,
            },
          },
          "& textarea.MuiInputBase-input": {
            padding: "8px 10px",
            color: "#0F172A",
            "&::placeholder": {
              color: "rgba(51, 65, 85, 0.62)",
              opacity: 1,
            },
          },
          "& .MuiSelect-icon": {
            color: "rgba(15, 23, 42, 0.8)",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(15, 23, 42, 0.72)",
          "&.Mui-focused": {
            color: "rgba(15, 23, 42, 0.88)",
          },
          "&.Mui-disabled": {
            color: "rgba(51, 65, 85, 0.52)",
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(15, 23, 42, 0.08)",
          boxShadow: "0 2px 8px rgba(15, 23, 42, 0.06)",
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "10px 12px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
