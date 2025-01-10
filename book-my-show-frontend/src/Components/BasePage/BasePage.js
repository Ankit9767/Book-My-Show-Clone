import React from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./BasePage.css";

const BasePage = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse", 
        },
        onClick: {
          enable: true,
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100, 
          duration: 0.4,
        },
        push: {
          quantity: 4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff", 
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce", 
        },
        speed: 2,
      },
      number: {
        density: {
          enable: true,
          area: 800, 
        },
        value: 75, 
      },
      opacity: {
        value: 0.5, 
      },
      shape: {
        type: "circle", 
      },
      size: {
        value: { min: 1, max: 5 }, 
      },
    },
    detectRetina: true,
  };

  return (
    <div className="base-container">
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
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


