import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Table from "@/components/table/Table";
import Home from "@/pages/Home";
import Invitations from "@/pages/Invitations";
import Environment from "@/pages/Environment";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "@/components/user_auth/Signup";

const AppRouting = () => {
  const router = createBrowserRouter([
    {
      path: "/signup",
      Component: Signup,
    },
    {
      Component: ProtectedRoute,
      children: [
        {
          path: "/",
          Component: MainLayout,
          children: [
            {
              index: true,
             Component: Home,
            },
            {
              path: "user",
              Component: Table,
            },
            {
              path: "invitations",
              Component: Invitations,
            },
            {
              path: "environments",
              Component: Environment,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouting;