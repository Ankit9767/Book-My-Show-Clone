import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './movieDetails.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { movieID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8080/api/movies/${movieID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Movie details fetched:', response.data);
        setMovie(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
        setError("Failed to fetch movie details. Please try again later.");
      });
  }, [movieID]);

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

  const handleAvailableSHowsClick = () => {
    navigate(`/dashboard/shows/${movieID}`);
  };

  const handleBackButtonClick = () => {
    navigate(-1); 
  };

  if (error) return <div>{error}</div>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-details-inner">
        <div className="movie-image-card" style={{ backgroundImage: `url(${getMovieImage(movie.title)})` }}></div>

        <div className="movie-details-card">
          <h2>{movie.title}</h2>
          <p><strong>Description:</strong> {movie.description}</p>
          <p><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p><strong>Duration:</strong> {movie.duration} minutes</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
        </div>
      </div>

      <div className="avilable-shows-movie-details-back-button-container">
        <button className="avilable-shows-button" onClick={handleAvailableSHowsClick}>Available Shows</button>
        <button className="movie-details-back-button" onClick={handleBackButtonClick}>Back</button>
      </div>
    </div>
  );
};

export default MovieDetails;
