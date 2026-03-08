import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router";

const SidebarNavItem = ({ item, isCollapsed, onClose }) => {
  const Icon = item.icon;

  return (
    <li>
      <NavLink
        to={item.url}
        onClick={onClose}
        aria-label={item.text}
        title={isCollapsed ? item.text : undefined}
        className={({ isActive }) => cn("sidebar-nav-link", isActive && "sidebar-nav-link-active")}
      >
        <span className="sidebar-nav-icon">
          <Icon size={18} />
        </span>

        <span className="sidebar-nav-copy">
          <span className="sidebar-nav-title">{item.text}</span>
        </span>

        {!isCollapsed ? <ChevronRight className="sidebar-nav-arrow" size={16} /> : null}
      </NavLink>
    </li>
  );
};

export default SidebarNavItem;
