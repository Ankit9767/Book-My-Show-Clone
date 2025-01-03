import React from "react";
import { Link } from "react-router-dom";
import "./BasePage.css";

const BasePage = () => {
  return (
    <div className="base-container">
      <div className="hero-section">
        <h1 className="header">Welcome to Movies Sphere</h1>
        <p className="tagline">Explore and discover movies tailored for you!</p>
      </div>
      <div className="button-container">
        <Link to="/login">
          <button className="btn primary-btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn secondary-btn">Register</button>
        </Link>
      </div>
      <div className="footer">
        <p>© 2024 Movies Sphere. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default BasePage;
