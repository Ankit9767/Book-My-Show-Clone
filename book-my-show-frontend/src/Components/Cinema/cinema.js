import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './cinema.css';
import cinemaImage from '../../assets/images/cinema.jpg';

const Cinemas = () => {
  const [cinemas, setCinemas] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    
    axios
      .get('http://localhost:8080/api/cinemas/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCinemas(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching cinemas:', error);
        setError('Failed to fetch cinemas. Please check your credentials or try again.');
      });
  }, []);

  const handleCinemaClick = (cinemaID) => {
    const token = localStorage.getItem('token'); 

    axios
      .get(`http://localhost:8080/api/cinema-halls/cinema/${cinemaID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          navigate(`/dashboard/cinemaHall?cinemaId=${cinemaID}`);
        } else {
          alert('No cinema halls available for this cinema.');
        }
      })
      .catch((error) => {
        console.error('Error fetching cinema halls:', error);
        alert('Failed to fetch cinema halls. Please try again later.');
      });
  };

  return (
    <div className="cinemas-container">
      <h2>Available Cinemas</h2>
      {error && <p>{error}</p>}

      <div className="cinemas-grid">
        {cinemas.length > 0 ? (
          cinemas.map((cinema) => (
            <div
              key={cinema.cinemaID}
              className="cinema-card"
              style={{
                backgroundImage: `url(${cinemaImage})`,
              }}
              onClick={() => handleCinemaClick(cinema.cinemaID)}
            >
              <h3>{cinema.name}</h3>
            </div>
          ))
        ) : (
          <p>No cinemas available.</p>
        )}
      </div>
    </div>
  );
};

export default Cinemas;
