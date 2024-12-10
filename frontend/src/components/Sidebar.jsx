import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaChevronUp,
  FaChevronDown,
  FaUserCircle,
  FaHome,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const baseLinkStyle = "flex items-center space-x-4 text-gray-400 hover:text-orange-500";

  return (
    <div className="flex flex-col justify-between w-64 h-screen text-white bg-black shadow-lg">
      {/* User Info */}
      <div className="flex flex-col items-center px-4 py-6">
        <FaUserCircle size={80} className="mb-4 text-gray-400" />
        <div className="text-center">
          <p className="text-lg font-semibold">
            {user?.username || "Login to view Your Profile"}
          </p>
        </div>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 px-4">
        <ul className="space-y-6">
          {/* Browse Recipes */}
          <li>
            <Link to="/" className={baseLinkStyle}>
              <FaHome size={20} />
              <span className="text-md">Browse Recipes</span>
            </Link>
          </li>

          {/* Profile Dropdown */}
          <li className="cursor-pointer">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between space-x-4 text-gray-400 hover:text-orange-500"
            >
              <div className="flex items-center space-x-4">
                <FaUserCircle size={20} />
                <span className="text-md">My Profile</span>
              </div>
              {isDropdownOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
            </div>
            {isDropdownOpen && (
              <ul className="mt-3 ml-8 space-y-2 text-gray-500">
                <li>
                  <Link to="/myfeed" className="hover:text-orange-500">
                    My Feed
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="/upload-recipe" className="hover:text-orange-500">
                    Upload Recipe
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Bottom Section */}
      <nav className="px-4">
        <ul className="space-y-6">
          <li>
            <Link to="/settings" className={baseLinkStyle}>
              <FaCog size={20} />
              <span className="text-md">Settings</span>
            </Link>
          </li>

          <li>
            <Link to="/faq" className={baseLinkStyle}>
              <FaQuestionCircle size={20} />
              <span className="text-md">FAQ</span>
            </Link>
          </li>

          <li className="pb-5">
            <button
              onClick={handleLogout}
              className={`${baseLinkStyle} w-full`}
            >
              <FaSignOutAlt size={20} />
              <span className="text-md">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;