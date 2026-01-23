import { Toaster } from "react-hot-toast";
import AppRouting from "./routing/AppRouting";
import { AuthProvider } from "./context/AuthProvider";

const App = () => {
  return (
    <>
      <AuthProvider>
        <AppRouting />
        <Toaster />
      </AuthProvider>
    </>
  );
};

export default App;
