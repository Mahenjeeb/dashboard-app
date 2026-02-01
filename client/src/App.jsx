import { Toaster } from "react-hot-toast";
import AppRouting from "./routing/AppRouting";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/util/queryClient";

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouting />
        <Toaster />
      </QueryClientProvider>
    </>
  );
};

export default App;
