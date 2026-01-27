import { Home, Mail, Settings2, User } from "lucide-react";
const sidebarMenuItems = [
  {
    icon: Home,
    url: "/",
    text: "Home",
  },
  {
    icon: Mail,
    url: "/invitations",
    text: "Invitations",
  },
  {
    icon: User,
    url: "/user",
    text: "Users",
  },
  {
    icon: Settings2,
    url: "/environments",
    text: "Environment Variables",
  },
];

export default sidebarMenuItems;
