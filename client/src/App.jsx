import { Toaster } from "react-hot-toast";
import AppRouting from "./routing/AppRouting";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/util/queryClient";
import { UserProvider } from "./context/UserContext";
const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <AppRouting />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: "0px",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                background: "#FFFFFF",
                color: "#0F172A",
              },
            }}
          />
        </UserProvider>
      </QueryClientProvider>
  );
};

export default App;
