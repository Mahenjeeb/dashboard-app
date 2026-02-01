import { Home, Mail, Settings2, Users } from "lucide-react";
const sidebarMenuItems = [
  {
    icon: Users,
    url: "/users",
    text: "Users",
  },
  {
    icon: Mail,
    url: "/invitations",
    text: "Invitations",
  },
  {
    icon: Settings2,
    url: "/environments",
    text: "Environment Variables",
  },
];

export default sidebarMenuItems;
