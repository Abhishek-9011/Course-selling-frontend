import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track logged-in status
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false); // Dropdown visibility
  const [isAdmin, setIsAdmin] = useState(false); // Role check
  const [profileImage, setProfileImage] = useState(""); // Profile image state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsLoggedIn(true);
        if (decodedToken.role === "admin") {
          setIsAdmin(true);
        }
        // Set profile image or use default
        setProfileImage(
          decodedToken.profileImage ||
            "https://cdn-icons-png.flaticon.com/128/6997/6997674.png"
        );
      } catch (error) {
        console.error("Invalid token format:", error);
        setIsLoggedIn(false); // Log out if token is invalid
      }
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update state to logged out
    navigate("/");
  }

  function toggleDropdown() {
    setProfile((prevProfile) => !prevProfile);
  }

  return (
    <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
      {/* Logo */}
      <img
        className="h-10"
        src="/SkillBazar.png"
        alt="SkillBazar Logo"
      />

      {/* Navigation Links or Buttons */}
      <div className="flex items-center space-x-4">
        {isLoggedIn && (
          <Link
            to={isAdmin ? "/admin-dashboard" : "/user-dashboard"}
            className="text-lg font-medium hover:text-gray-200"
          >
            Content Page
          </Link>
        )}
        {!isLoggedIn ? ( // Show login/signup buttons if NOT logged in
          <div className="flex space-x-4">
            <Link to="/login">
              <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">
                SignUp
              </button>
            </Link>
          </div>
        ) : (
          <div className="relative">
            {/* Profile Image */}
            <img
              onClick={toggleDropdown}
              className="h-10 w-10 rounded-full cursor-pointer border-2 border-white"
              src={profileImage}
              alt="User Icon"
            />

            {/* Dropdown Menu */}
            {profile && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-red-200 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
