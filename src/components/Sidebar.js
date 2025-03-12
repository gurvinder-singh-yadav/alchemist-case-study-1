import React, { useState } from "react";
import "./Sidebar.css";
import ThemeToggle from "./ThemeToggle";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Only render the toggle button if it's being used within DashboardContent
  const isMobileToggle = window.location.pathname !== "/";

  return (
    <>
      {isMobileToggle && (
        <button className="sidebar-toggle d-md-none" onClick={toggleSidebar}>
          ☰
        </button>
      )}
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Reports
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Settings
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
