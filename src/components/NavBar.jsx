import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      // Error logic maybe redirect to error page
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300 border-b border-base-200 fixed top-0 z-50 px-4">
      <div className="flex-1">
        <Link
          to={user && "/"}
          className="btn btn-ghost normal-case text-xl font-bold tracking-wide"
        >
          ♥️ Tindora
        </Link>
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

        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user.data && (
                  <img
                    alt={
                      user?.data?.gender == "male"
                        ? "https://i.pinimg.com/736x/a8/9d/28/a89d285e280a5d21c5d7d0cf9f30ddef.jpg"
                        : user?.data?.gender == "female"
                        ? "https://i.pinimg.com/736x/98/44/7f/98447fdc1297c05d8db0824b78ca0e0f.jpg"
                        : "https://i.pinimg.com/1200x/cc/ef/70/ccef70e1f67357edd659be8d1da6813e.jpg"
                    }
                    src={user?.data?.photoUrl[0]}
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow z-50"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge badge-primary">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/"}>My Feed</Link>
              </li>
              <li>
                <Link to="/connections">My Connections</Link>
              </li>
              <li>
                <Link to="/requests">New Requests</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
