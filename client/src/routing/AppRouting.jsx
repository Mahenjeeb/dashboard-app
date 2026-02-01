import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Table from "@/components/table/Table";
import Invitations from "@/pages/Invitations";
import Environment from "@/pages/Environment";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "@/components/user_auth/Signup";
import PageNotFound from "@/pages/PageNotFound";
import { commonLoader } from "@/api/CommonLoader";

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
              path: "users",
              Component: Table,
              loader: commonLoader,
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
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouting;
