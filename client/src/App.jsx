import { Toaster } from "react-hot-toast";
import AppRouting from "./routing/AppRouting";

const App = () => {
  return (
    <>
      <AppRouting />
      <Toaster />
    </>
  );
};

export default App;
