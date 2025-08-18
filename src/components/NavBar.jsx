import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const NavBar = () => {

  const user = useSelector((store) => store.user);
 

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="navbar bg-base-300 border-b border-base-200 fixed top-0 z-50 px-4">
    
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl font-bold tracking-wide">
          ♥️ Tindora
        </a>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-base-200 transition focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {theme === "light" ? (
            <FiMoon size={14} className="text-gray-700" />
          ) : (
            <FiSun size={14} className="text-yellow-400" />
          )}
        </button>

        {/* Avatar Dropdown */}
        {user && (<div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                alt="User avatar"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow z-50"
          >
            <li>
              <Link to = "/profile" className="justify-between">
                Profile
                <span className="badge badge-primary">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link to = "/login">Logout</Link>
            </li>
          </ul>
        </div>)}
      </div>
    </div>
  );
};

export default NavBar;
