import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import "./sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Invalid token format:", error);
      }
    }
  }, []);

  const menuItems = isAdmin
    ? [
        { label: "Home", iconClass: "home-icon", path: "/" },
        { label: "Create Course", iconClass: "home-icon", path: "/Create-Course" },
        // { label: "Update Course", iconClass: "home-icon", path: "/update-Course" },
        { label: "All Courses", iconClass: "about-icon", path: "/course" },
        { label: "Your Creations", iconClass: "services-icon", path: "/admin-creations" },
      ]
    : [
        { label: "Home", iconClass: "home-icon", path: "/" },
        { label: "All Courses", iconClass: "about-icon", path: "/course" },
        { label: "Your Purchases", iconClass: "services-icon", path: "/purchases" },
      ];

  return (
    <div className="sidebarContainer">
      <div className="sidebar">
        <h2 className="sidebar-title">SkillBazar</h2>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li className="menu-item" key={index}>
              <Link style={{color:"white"}}      to={item.path} className="menu-link">
                <i className={`icon ${item.iconClass}`}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
