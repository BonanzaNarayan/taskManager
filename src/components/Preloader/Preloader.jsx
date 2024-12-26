// Preloader.js
import React from "react";
import "./Preloader.css"; // Optional: For styling

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Preloader;
