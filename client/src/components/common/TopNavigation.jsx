import { useUser } from "@/context/UserContext";
import {
  ChevronDown,
  LogIn,
  Menu,
  Settings,
  ShieldCheck,
  UserPlus,
  UserRound,
} from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { Link } from "react-router";

const getDisplayName = (user) =>
  user?.name || user?.fullName || user?.username || user?.email?.split("@")[0] || "Admin User";

const getDisplayEmail = (user) => user?.email || "admin@dashboard.app";

const getDisplayRole = (user) =>
  user?.role?.replaceAll("_", " ") || user?.userRole?.replaceAll("_", " ") || "Workspace Admin";

const getInitials = (value) =>
  value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "AU";

const TopNavigation = ({ currentItem, onOpenSidebar }) => {
  const { isLoading, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const displayName = getDisplayName(user);
  const displayEmail = getDisplayEmail(user);
  const displayRole = getDisplayRole(user);
  const initials = getInitials(displayName);

  const handlePointerDown = useEffectEvent((event) => {
    if (!menuRef.current?.contains(event.target)) {
      setIsMenuOpen(false);
    }
  });

  useEffect(() => {
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="topbar-menu-button"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="topbar-copy">
          <p className="topbar-title">{currentItem?.text ?? "Dashboard"}</p>
          <p className="topbar-subtitle">
            {currentItem?.description ?? "Manage your workspace from one place."}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="topbar-loading-pill" aria-hidden="true" />
      ) : user ? (
        <div className="topbar-profile" ref={menuRef}>
          <button
            type="button"
            className="topbar-profile-button"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-expanded={isMenuOpen}
            aria-label="Open user menu"
          >
            <span className="topbar-avatar">{initials}</span>

            <span className="topbar-profile-copy">
              <span className="topbar-profile-name">{displayName}</span>
              <span className="topbar-profile-role">{displayRole}</span>
            </span>

            <ChevronDown
              size={16}
              className={`topbar-profile-chevron ${isMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isMenuOpen ? (
            <div className="topbar-menu">
              <div className="topbar-menu-section">
                <div className="topbar-menu-header">
                  <span className="topbar-menu-avatar">{initials}</span>

                  <div>
                    <p className="topbar-menu-name">{displayName}</p>
                    <p className="topbar-menu-email">{displayEmail}</p>
                  </div>
                </div>

                <div className="topbar-menu-meta">
                  <span className="topbar-menu-badge">
                    <ShieldCheck size={14} />
                    {displayRole}
                  </span>
                </div>
              </div>

              <div className="topbar-menu-actions">
                <Link to="/settings" className="topbar-menu-item" onClick={() => setIsMenuOpen(false)}>
                  <Settings size={16} />
                  Account Settings
                </Link>

                <div className="topbar-menu-detail">
                  <UserRound size={16} />
                  Signed in as {displayName}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="topbar-actions">
          <Link to="/signin" className="topbar-auth-button">
            <LogIn size={16} />
            Sign In
          </Link>

          <Link to="/signup" className="topbar-auth-button topbar-auth-button-primary">
            <UserPlus size={16} />
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default TopNavigation;
