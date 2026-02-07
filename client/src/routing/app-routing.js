import Table from "@/components/table/Table";
import Invitations from "@/pages/Invitations";
import Environment from "@/pages/Environment";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "@/components/user_auth/Signup";
import PageNotFound from "@/pages/PageNotFound";
import { commonLoader } from "@/api/commonLoader";
import MainLayout from "@/layout/MainLayout";
export const routes = [
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/404",
    Component: PageNotFound,
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
            loader: commonLoader,
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
    Component: PageNotFound,
  },
];
