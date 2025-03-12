import React, { useEffect, useState } from "react";
import "./ThemeToggle.css";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // Get initial state from localStorage
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    // Update localStorage and body class when theme changes
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="theme-toggle">
      <button
        className={`btn ${darkMode ? "btn-light" : "btn-dark"}`}
        onClick={toggleTheme}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}

export default ThemeToggle;
