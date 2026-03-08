import Logo from "@/components/common/Logo";
import SidebarNavItem from "@/components/sidebar/SidebarNavItem";
import sidebarMenuItems from "@/data/sidebarMenuItems";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";

const Sidebar = ({ isCollapsed, isOpen, onClose, onToggleCollapse }) => {
  return (
    <aside
      className={`sidebar-wrapper ${isOpen ? "sidebar-wrapper-open" : ""} ${
        isCollapsed ? "sidebar-wrapper-collapsed" : ""
      }`}
    >
      <div className="sidebar-surface">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <Logo />

            <div className="sidebar-brand-copy">
              <h2 className="sidebar-brand-title">Dashboard App</h2>
            </div>

            <button
              type="button"
              className="sidebar-hover-toggle"
              onClick={onToggleCollapse}
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen size={16} />
            </button>
          </div>

          <div className="sidebar-header-actions">
            <button
              type="button"
              className="sidebar-collapse-toggle"
              onClick={onToggleCollapse}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}
            </button>

            <button
              type="button"
              className="sidebar-close"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Primary navigation">
          <ul className="sidebar-menu-list">
            {sidebarMenuItems.map((item) => (
              <SidebarNavItem
                key={item.url}
                item={item}
                isCollapsed={isCollapsed}
                onClose={onClose}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
