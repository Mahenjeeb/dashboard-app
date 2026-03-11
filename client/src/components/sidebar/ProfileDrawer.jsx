import { useEffect, useRef, useState } from "react";
import { LogOut, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";

const ProfileDrawer = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const name = user?.name?.trim() || "Account";
  const email = user?.email?.trim() || "No email available";
  const avatarLetter = name.charAt(0).toUpperCase();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <Button
        aria-label="Open profile menu"
        aria-expanded={isOpen}
        className="size-10 rounded-full border border-slate-200/70 bg-white p-0 shadow-[0_4px_12px_rgba(15,23,42,0.035)] hover:bg-slate-50"
        type="button"
        variant="outline"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          {avatarLetter}
        </span>
      </Button>

      {isOpen ? (
        <div className="absolute right-0 z-40 mt-2 w-64 rounded-2xl border border-slate-200/70 bg-white p-2 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
          <div className="rounded-xl px-3 py-2">
            <p className="truncate text-sm font-medium text-slate-900">{name}</p>
            <p className="truncate text-xs text-slate-500">{email}</p>
          </div>

          <div className="mt-1 space-y-1">
            <button
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
              type="button"
            >
              <Settings className="size-4 text-slate-500" />
              Profile settings
            </button>

            <div className="border-t border-slate-200" />

            <button
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
              type="button"
            >
              <LogOut className="size-4" />
              Log out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileDrawer;
