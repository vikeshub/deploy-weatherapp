import React, { useState, useEffect } from "react";
import "./App.css";
import Weather from "./components/Weather.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app light-mode"}>
      <button onClick={toggleDarkMode} className="theme-toggle-button">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <Weather />
    </div>
  );
}

export default App;