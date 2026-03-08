import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import TopNavigation from "@/components/common/TopNavigation";
import Sidebar from "@/components/sidebar/Sidebar";
import sidebarMenuItems from "@/data/sidebarMenuItems";
import "@/components/common/css/sidebar.css";

const SidebarLayout = () => {
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const currentItem = sidebarMenuItems.find(
    (item) => pathname === item.url || pathname.startsWith(`${item.url}/`),
  );

  return (
    <div
      className={`dashboard-shell ${isSidebarCollapsed ? "dashboard-shell-collapsed" : ""}`}
    >
      <div
        aria-hidden="true"
        className={`sidebar-backdrop ${isSidebarOpen ? "sidebar-backdrop-open" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggleCollapse={() => setIsSidebarCollapsed((value) => !value)}
      />

      <main className="content-shell">
        <TopNavigation
          key={pathname}
          currentItem={currentItem}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        <section className="content-panel">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default SidebarLayout;
