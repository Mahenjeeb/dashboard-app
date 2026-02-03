import { Toaster } from "react-hot-toast";
import AppRouting from "./routing/AppRouting";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/util/queryClient";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <AppRouting />
          <Toaster />
        </UserProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
