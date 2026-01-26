import { PanelsTopLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import instance from "@/services/auth_service";

const Navbar = () => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/me");
      setUserInfo(data.user);
    })();
  }, []);

  const firstLetter = userInfo.email;
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
              {firstLetter}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
