import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import React from "react";
import useApi from "../hooks/useApi";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { request } = useApi();

  // Get the current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const fullName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : "Guest";
  
  const role = currentUser?.role;

  // Redirect based on user role when logo is clicked
  const handleLogoClick = () => {
    if (role === "ADMIN" || role === "READONLY") {
      navigate("/usermanagement");
    } else if (role === "CUSTOMER") {
      navigate("/costexplorer");
    }
  };

  const handleLogout = async () => {
    try {
      await request({
        method: "POST",
        url: "/auth/logout",
        auth: true,
      });
    } catch (err) {
      console.warn("Logout request failed:", err.message);
    } finally {
      // Clear user data from localStorage
      localStorage.removeItem('user');
      toast.success("Logged out Successfully");
      navigate("/");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-20 bg-white text-blue-700 shadow-lg flex z-50">
      {/* Left: Logo */}
      <div className="w-[240px] flex items-center justify-center cursor-pointer" onClick={handleLogoClick}>
        <img src="/image.png" alt="Logo" className="h-12 object-contain" />
      </div>

      {/* Right: Hamburger + User Info */}
      <div className="flex flex-1 items-center justify-between px-8">
        <button
          onClick={toggleSidebar}
          className="text-blue-700 text-2xl focus:outline-none cursor-pointer"
        >
          <FaBars />
        </button>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 max-w-[200px] truncate">
            <div className="text-blue-700 text-3xl">
              <FaUserCircle />
            </div>
            <div className="leading-tight truncate">
              <p className="text-sm text-gray-500">Welcome</p>
              <p className="text-base font-semibold truncate">{fullName}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-blue-700 px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition-all duration-200 text-sm"
          >
            <FaSignOutAlt className="text-base" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
