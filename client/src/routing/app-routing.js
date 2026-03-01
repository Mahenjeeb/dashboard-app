import Table from "@/components/table/Table";
import Invitations from "@/pages/Invitations";
import Environment from "@/pages/Environment";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "@/pages/PageNotFound";
import AcceptInvitation from "@/pages/AcceptInvitation";
import { commonLoader } from "@/api/commonLoader";
import MainLayout from "@/layout/MainLayout";
import { redirect } from "react-router";

export const routes = [
  {
    path: "/signup",
    loader: ({ request }) => {
      const mode = new URL(request.url).searchParams.get("mode") === "signup"
        ? "signup"
        : "signin";
      return redirect(`/users?auth=${mode}`);
    },
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
            index: true,
            loader: () => redirect("/users"),
          },
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
    path: "accept",
    Component: AcceptInvitation,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
];
