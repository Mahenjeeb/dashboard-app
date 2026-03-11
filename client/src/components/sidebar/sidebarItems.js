import { Globe, Send, Settings2, Users } from "lucide-react";

export const sidebarItems = [
  {
    label: "Environment",
    to: "/",
    icon: Globe,
  },
  {
    label: "Invitations",
    to: "/invitations",
    icon: Send,
  },
  {
    label: "Users",
    to: "/users",
    icon: Users,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings2,
  },
];

export const isSidebarItemActive = (pathname, itemPath) => {
  if (itemPath === "/") {
    return pathname === "/" || pathname === "/environments";
  }

  return pathname.startsWith(itemPath);
};

export const getSidebarPageTitle = (pathname) => {
  const activeItem = sidebarItems.find((item) =>
    isSidebarItemActive(pathname, item.to),
  );

  return activeItem?.label ?? "Dashboard";
};
