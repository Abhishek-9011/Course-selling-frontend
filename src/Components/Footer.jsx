import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Import the CSS file for Footer

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        {/* Footer Links */}
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
      <div className="year">
      &copy; {new Date().getFullYear()} YourCourseApp. All Rights Reserved.

      </div>
    </div>
  );
}

export default Footer;
