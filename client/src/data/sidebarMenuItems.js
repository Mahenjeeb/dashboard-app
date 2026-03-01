import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";

const sidebarMenuItems = [
  {
    icon: GroupOutlinedIcon,
    url: "/users",
    text: "Users",
    isAdmin: true,
  },
  {
    icon: MailOutlineRoundedIcon,
    url: "/invitations",
    text: "Invitations",
    isAdmin: true,
  },
  {
    icon: DataObjectRoundedIcon,
    url: "/environments",
    text: "Environment Variables",
    isAdmin: false,
  },
];

export default sidebarMenuItems;
