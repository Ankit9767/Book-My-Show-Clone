import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedRole) {
      setRole(storedRole);
    }    
    
    axios
      .get("http://localhost:8080/api/movies/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Movies fetched:', response.data);
        setMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setError("Failed to fetch movies. Please check your credentials or try again.");
      });
  }, []);

  const getMovieImage = (movieTitle) => {

    const imageName = movieTitle.toLowerCase()
      .replace(/\s+/g, '-')  
      .replace(/:/g, '');   
    try {
      return require(`../../assets/images/${imageName}.jpg`);
    } catch (error) {
      console.error(`Image for movie "${movieTitle}" not found.`);
      return require('../../assets/images/image.jpg');
    }
  };

  const handleMovieClick = (movieID) => {
    navigate(`/dashboard/movies/${movieID}`);
  };

  return (
    <div className="movies-container">
      <h2>Available Movies</h2>
      {error && <p className="error-message">{error}</p>} 

      <div className="movies-grid">
        {movies.map((movie) => (
          <div
            key={movie.movieID}
            className="movie-card"
            style={{ backgroundImage: `url(${getMovieImage(movie.title)})` }}
            onClick={() => handleMovieClick(movie.movieID)} 
          >
            <div className="movie-title">{movie.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
