import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Menu } from "lucide-react";

import AuthActionButton from "@/components/sidebar/AuthActionButton";
import SidebarBrand from "@/components/sidebar/SidebarBrand";
import SidebarNavigation from "@/components/sidebar/SidebarNavigation";
import {
  getSidebarPageTitle,
  sidebarItems,
} from "@/components/sidebar/sidebarItems";
import { Button } from "@/components/ui/button";

const SidebarLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const pageTitle = useMemo(
    () => getSidebarPageTitle(location.pathname),
    [location.pathname],
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="relative hidden w-72 bg-white shadow-[4px_0_18px_rgba(15,23,42,0.035)] md:block">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-px bg-slate-200/90 shadow-[3px_0_10px_rgba(15,23,42,0.06)]"
          />
          <div className="flex h-full flex-col bg-white px-4">
            <SidebarBrand />
            <SidebarNavigation
              items={sidebarItems}
              pathname={location.pathname}
            />
          </div>
        </aside>

        {isMobileSidebarOpen ? (
          <>
            <button
              aria-label="Close sidebar overlay"
              className="fixed inset-0 z-40 bg-slate-950/25 md:hidden"
              type="button"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-[10px_0_28px_rgba(15,23,42,0.08)] md:hidden">
              <div
                aria-hidden="true"
                className="absolute inset-y-0 right-0 w-px bg-slate-200/90 shadow-[3px_0_10px_rgba(15,23,42,0.06)]"
              />
              <div className="flex h-full flex-col bg-white px-4">
                <SidebarBrand onClose={() => setIsMobileSidebarOpen(false)} />
                <SidebarNavigation
                  items={sidebarItems}
                  pathname={location.pathname}
                  onNavigate={() => setIsMobileSidebarOpen(false)}
                />
              </div>
            </aside>
          </>
        ) : null}

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 bg-white">
            <div className="flex min-h-[68px] items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-3">
                <Button
                  className="md:hidden"
                  size="icon-sm"
                  type="button"
                  variant="outline"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <Menu />
                </Button>

                <div>
                  <h1 className="text-lg font-semibold tracking-tight text-slate-900">
                    {pageTitle}
                  </h1>
                </div>
              </div>

              <AuthActionButton />
            </div>
            <div className="h-px bg-slate-200/80 shadow-[0_3px_10px_rgba(15,23,42,0.06)]" />
          </header>

          <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
