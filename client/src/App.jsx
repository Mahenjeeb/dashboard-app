import { Toaster } from "react-hot-toast";
import AppRouting from "./routing/AppRouting";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/util/queryClient";
import { UserProvider } from "./context/UserContext";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "*": { boxSizing: "border-box" },
          a: { color: "inherit", textDecoration: "none" },
          "#root": { minHeight: "100vh" },
        }}
      />
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <AppRouting />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: "12px",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                background: "#FFFFFF",
                color: "#0F172A",
              },
            }}
          />
        </UserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
