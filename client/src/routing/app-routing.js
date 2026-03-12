import Invitations from "@/pages/Invitations";
import Environment from "@/pages/Environment";
import PageNotFound from "@/pages/PageNotFound";
import Signin from "@/pages/Signin";
import SignupPage from "@/pages/Signup";
import User from "@/pages/Users";
import AcceptInvitation from "@/pages/AcceptInvitation";
import MainLayout from "@/layout/MainLayout";
import Settings from "@/pages/Settings";
import dataLoader from "@/util/dataLoader";

export const routes = [
  {
    path: "/signin",
    Component: Signin,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "users",
        Component: User,
        loader: dataLoader
      },
      {
        path: "invitations",
        Component: Invitations,
      },
      {
        index: true,
        Component: Environment,
      },
      {
        path: "environments",
        Component: Environment,
      },
      {
        path: "settings",
        Component: Settings,
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
