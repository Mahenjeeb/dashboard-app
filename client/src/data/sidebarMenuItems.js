import { Braces, Mail, Settings, Users } from "lucide-react";

const sidebarMenuItems = [
  {
    icon: Users,
    url: "/users",
    text: "Users",
    description: "Manage team members and access.",
  },
  {
    icon: Mail,
    url: "/invitations",
    text: "Invitations",
    description: "Track pending invites and onboarding.",
  },
  {
    icon: Braces,
    url: "/environments",
    text: "Environment Variables",
    description: "View and maintain app configuration.",
  },
  {
    icon: Settings,
    url: "/settings",
    text: "Settings",
    description: "Update workspace preferences.",
  },
];

export default sidebarMenuItems;
