import { PanelsTopLeft } from "lucide-react";
const Navbar = () => {
  return (
    <>
      <nav className="navbar w-full flex justify-between items-center border px-4 border-gray-200 shadow-md rounded-md">
        <div>
          <label htmlFor="sidebar-drawer" aria-label="open sidebar">
            <PanelsTopLeft />
          </label>
        </div>
        <div className="avatar avatar-placeholder">
          <div className="bg-gray-300 text-black w-12 rounded-full">
            <span className="uppercase font-extrabold text-xl">
              {"H"}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
