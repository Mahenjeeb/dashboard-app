import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router";
import Table from "@/components/table/Table";
import Home from "@/pages/Home";
import Invitations from "@/pages/Invitations";
import Environment from "@/pages/Environment";
const AppRouting = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <MainLayout/>,
        children: [
          {
            path: "/home",
            element: <Home/>
          },
          {
            path: "/user",
            element: <Table/>
          },
          {
            path: "/invitations",
            element: <Invitations/>
          },
          {
            path: "/environments",
            element: <Environment/>
          }
        ]
      }
    ]
  );
  return (
    <RouterProvider router={router}>
      <MainLayout/>
    </RouterProvider>
  );
};

export default AppRouting;
