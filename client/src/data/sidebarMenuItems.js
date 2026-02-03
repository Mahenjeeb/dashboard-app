import { Send, Settings2, Users } from "lucide-react";
const sidebarMenuItems = [
  {
    icon: Users,
    url: "users",
    text: "Users",
    isAdmin: true
  },
  {
    icon: Send,
    url: "invitations",
    text: "Invitations",
    isAdmin: true
  },
  {
    icon: Settings2,
    url: "/environments",
    text: "Environment Variables",
    isAdmin: false
  },
];

export default sidebarMenuItems;
