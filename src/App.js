import React from "react";
import "./App.css";
import DashboardContent from "./components/DashboardContent";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <DashboardContent />
      </div>
    </div>
  );
}

export default App;
