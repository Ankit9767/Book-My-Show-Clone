import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); 
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <div className="admin-options">
        <button
          className="admin-btn"
          onClick={() => handleNavigation('/dashboard/admin/cinemas')}
        >
          Manage Cinemas
        </button>
        <button
          className="admin-btn"
          onClick={() => handleNavigation('/dashboard/admin/cinema-halls')}
        >
          Manage Cinema Halls
        </button>
        <button
          className="admin-btn"
          onClick={() => handleNavigation('/dashboard/admin/movies')}
        >
          Manage Movies
        </button>
        <button
          className="admin-btn"
          onClick={() => handleNavigation('/dashboard/admin/shows')}
        >
        Manage Shows
        </button>
      </div>
    </div>
  );
};

export default Admin;
