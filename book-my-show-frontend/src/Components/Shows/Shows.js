import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Show.css';

const Shows = () => {
  const { cinemaHallID, movieID } = useParams();
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    let url = `http://localhost:8080/api/shows/all`; 

    if (cinemaHallID && movieID) {
      url = `http://localhost:8080/api/shows/cinema-Hall/${cinemaHallID}/movie/${movieID}`;
    }
    else if (cinemaHallID) {
      url = `http://localhost:8080/api/shows/cinema-Hall/${cinemaHallID}`;
    }
    else if (movieID) {
      url = `http://localhost:8080/api/shows/movie/${movieID}`;
    }

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setShows(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching shows:', error);
        setError('Failed to fetch shows. Please try again later.');
      });
  }, [cinemaHallID, movieID]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleBookClick = (showID) => {
    navigate(`/dashboard/booking/${showID}`); 
  };

  const handleBackButtonClick = () => {
    navigate(-1); 
  };

  return (
    <div className="shows-container">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackButtonClick}>Back</button>
      </div>

      <h2>Available Shows</h2>
      {error && <p>{error}</p>}

      <div className="shows-grid">
        {shows.length > 0 ? (
          shows.map((show) => (
            <div key={show.showID} className="show-card">
              <h3>{show.movie.title}</h3>
              <p>{show.movie.description}</p>
              <p><strong>Duration:</strong> {show.movie.duration}</p>
              <p><strong>Language:</strong> {show.movie.language}</p>
              <p><strong>Genre:</strong> {show.movie.genre}</p>
              <p><strong>Showtime:</strong> {formatDate(show.startTime)}</p>
              <p><strong>End Time:</strong> {formatDate(show.endTime)}</p>
              <p><strong>Cinema:</strong> {show.cinemaHall.cinema.name}</p>
              <p><strong>Cinema Hall:</strong> {show.cinemaHall.name}</p>
              <p><strong>Total Seats:</strong> {show.cinemaHall.totalSeats}</p>

              <button
                className="book-button"
                onClick={() => handleBookClick(show.showID)}
              >
                Book
              </button>
            </div>
          ))
        ) : (
          <p>No shows available.</p>
        )}
      </div>
    </div>
  );
};

export default Shows;

