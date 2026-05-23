import AppRouting from "./routing/AppRouting";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/util/queryClient";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <AppRouting />
          <ToastContainer
            position="top-right"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </UserProvider>
      </QueryClientProvider>
  );
};

export default App;
