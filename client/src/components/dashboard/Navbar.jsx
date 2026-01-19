import { PanelsTopLeft} from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="navbar w-full flex justify-between border px-4 border-gray-200 shadow-md rounded-md">
        <div>
          <label htmlFor="sidebar-drawer" aria-label="open sidebar">
            <PanelsTopLeft />
          </label>
        </div>
        <div>
          {/* <div className="avatar">
            <div className="w-12 rounded">
              <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
            </div>
          </div> */}
          <button className="btn btn-primary">Sign Up/Log In</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
