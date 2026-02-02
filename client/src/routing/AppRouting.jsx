import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./app-routing";
const AppRouting = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default AppRouting;
