import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { isSidebarItemActive } from "./sidebarItems";

const SidebarNavigation = ({ items, onNavigate, pathname }) => {
  return (
    <div className="mt-3">
      <nav className="space-y-2">
        {items.map((item) => {
          const isActive = isSidebarItemActive(pathname, item.to);
          const Icon = item.icon;

          return (
            <Button
              key={item.to}
              asChild
              className={cn(
                "h-10 w-full justify-start rounded-lg border px-3 text-sm font-medium shadow-none",
                isActive
                  ? "border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-100 hover:text-slate-900"
                  : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900",
              )}
              variant="ghost"
            >
              <NavLink to={item.to} onClick={onNavigate}>
                <Icon className="size-4" />
                {item.label}
              </NavLink>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default SidebarNavigation;
