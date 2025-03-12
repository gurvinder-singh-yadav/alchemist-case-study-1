import React, { useEffect, useState } from "react";
import CustomForm from "./CustomForm";
import "./DashboardContent.css";
import DataTable from "./DataTable";
import Widgets from "./Widgets";

function DashboardContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Reset sidebar state when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
        document.querySelector(".sidebar").classList.remove("active");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.querySelector(".sidebar").classList.toggle("active");
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-title-wrapper">
        <h2 className="dashboard-title">Dashboard Overview</h2>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
      <Widgets />
      <div className="mt-4">
        <h3>Data Table</h3>
        <DataTable />
      </div>
      <div className="mt-4">
        <h3>Custom Form</h3>
        <CustomForm />
      </div>
    </div>
  );
}

export default DashboardContent;
