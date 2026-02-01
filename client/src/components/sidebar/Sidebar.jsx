import "@/components/sidebar/Sidebar.css";
import { Link, Outlet } from "react-router";
import sidebarMenuItems from "@/data/sidebarMenuItems";
import Navbar from "@/components/dashboard/Navbar";
import Logo from "@/components/dashboard/Logo";
const Sidebar = () => {
  return (
    <>
      <div className="drawer lg:drawer-open bg-gray-100">
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-6">
          <Navbar />
          <div className="p-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <div className="sidebar-content">
            <Logo />
            <ul className="menu w-full grow">
              {sidebarMenuItems.map((item) => (
                <li key={item.text}>
                  <Link to={item.url} className="li-btn" data-tip={item.text}>
                    <item.icon className="sidebar-btn" />
                    <span className="li-span">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
