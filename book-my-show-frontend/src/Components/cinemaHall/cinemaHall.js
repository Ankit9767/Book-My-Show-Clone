import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './cinemaHalls.css';
import cinemaHallImage from '../../assets/images/cinema-hall.jpg';

const CinemaHalls = () => {
  const [cinemaHalls, setCinemaHalls] = useState([]);
  const [cinemaName, setCinemaName] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const cinemaId = queryParams.get('cinemaId');

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(`http://localhost:8080/api/cinema-halls/cinema/${cinemaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCinemaHalls(response.data);
        if (response.data.length > 0) {
          setCinemaName(response.data[0].cinema.name); 
        }
      })
      .catch((error) => {
        console.error('Error fetching cinema halls:', error);
        setError('Failed to fetch cinema halls. Please try again later.');
      });
  }, [cinemaId]);

  const handleCinemaHallClick = (cinemaHallID) => {
    navigate(`/dashboard/cinemaHalls/${cinemaHallID}/shows`);
  };

  const handleBackButtonClick = () => {
    navigate(-1); 
  };

  return (
    <div className="cinemaHalls-container">
      
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackButtonClick}>Back</button>
      </div>

      <h2>{cinemaName ? `Cinema Halls for ${cinemaName}` : 'No Cinema Found'}</h2>
      {error && <p>{error}</p>}

      <div className="cinemaHalls-grid">
        {cinemaHalls.length > 0 ? (
          cinemaHalls.map((cinemaHall) => (
            <div
              key={cinemaHall.cinemaHallID}
              className="cinemaHall-card"
              style={{
                backgroundImage: `url(${cinemaHallImage})`,
              }}
              onClick={() => handleCinemaHallClick(cinemaHall.cinemaHallID)}
            >
              <h3>{cinemaHall.name}</h3>
              <p>Total Seats: {cinemaHall.totalSeats}</p>
            </div>
          ))
        ) : (
          <p>No cinema halls available.</p>
        )}  
      </div>
    </div>
  );
};

export default CinemaHalls;
