import { Toaster } from "react-hot-toast";
import AppRouting from "./routing/AppRouting";
// import { UserProvider } from "./context/UserContext";
const App = () => {
  return (
    <>
      {/* <UserProvider> */}
        <AppRouting />
        <Toaster />
      {/* </UserProvider> */}
    </>
  );
};

export default App;
