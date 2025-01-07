import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './MoviesCRUD.css'; // Import the CSS file for styling

const MoviesCRUD = () => {
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    description: "",
    duration: "",
    language: "",
    releaseDate: "",
    country: "",
    genre: "",
  });
  const [editMovie, setEditMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
    fetchCinemas(); 
  }, []);

  const fetchMovies = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/movies/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setMovies(response.data))
      .catch((err) => setError("Failed to fetch movies."));
  };

  const fetchCinemas = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/cinemas/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCinemas(response.data))
      .catch((err) => setError("Failed to fetch cinemas."));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditMovie = (movie) => {
    setEditMovie(movie);
    setMovieDetails({
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      language: movie.language,
      releaseDate: movie.releaseDate.slice(0, 10),
      country: movie.country,
      genre: movie.genre,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const releaseDateWithTime = `${movieDetails.releaseDate}T00:00:00`;

    const token = localStorage.getItem("token");
    const payload = { ...movieDetails, releaseDate: releaseDateWithTime };

    if (editMovie) {
      axios
        .put(
          `http://localhost:8080/api/movies/update/${editMovie.movieID}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setEditMovie(null);
          setMovieDetails({
            title: "",
            description: "",
            duration: "",
            language: "",
            releaseDate: "",
            country: "",
            genre: "",
          });
          fetchMovies();
        })
        .catch((err) => setError("Failed to update movie."));
    } else {
      axios
        .post("http://localhost:8080/api/movies/add", payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setMovieDetails({
            title: "",
            description: "",
            duration: "",
            language: "",
            releaseDate: "",
            country: "",
            genre: "",
          });
          fetchMovies();
        })
        .catch((err) => setError("Failed to add movie."));
    }
  };

  const handleDeleteMovie = (movieID) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8080/api/movies/delete/${movieID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchMovies())
      .catch((err) => setError("Failed to delete movie."));
  };

  return (
    <div className="movies-crud-container">
      <h2>Manage Movies</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="add-movie-section">
        <h3>{editMovie ? "Edit Movie" : "Add Movie"}</h3>
        <form className="add-movie-form" onSubmit={handleSubmit}>
          <div className="add-movie-form-group">
            <label className="add-movie-form-label" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="add-movie-form-input"
              value={movieDetails.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-movie-form-group">
            <label className="add-movie-form-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="add-movie-form-textarea"
              value={movieDetails.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-movie-form-group">
            <label className="add-movie-form-label" htmlFor="duration">
              Duration (minutes)
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              className="add-movie-form-input"
              value={movieDetails.duration}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-movie-form-group">
            <label className="add-movie-form-label" htmlFor="language">
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              className="add-movie-form-input"
              value={movieDetails.language}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-movie-form-group">
            <label className="add-movie-form-label" htmlFor="releaseDate">
              Release Date
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              className="add-movie-form-input"
              value={movieDetails.releaseDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-movie-form-group">
            <label className="add-movie-form-label" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="add-movie-form-input"
              value={movieDetails.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-movie-form-group">
            <label className="add-movie-form-label" htmlFor="genre">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              className="add-movie-form-input"
              value={movieDetails.genre}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="add-movie-btn-submit">
            {editMovie ? "Update Movie" : "Add Movie"}
          </button>
        </form>
      </div>

      <div className="movies-list">
        <h3>Movie List</h3>
        {movies.map((movie) => (
          <div key={movie.movieID} className="movie-item">
            <div>
              <h4>{movie.title}</h4>
              <p>Duration: {movie.duration} mins</p>
              <p>{movie.description}</p>
            </div>
            <div className="movie-actions">
              <button onClick={() => handleEditMovie(movie)}>Edit</button>
              <button onClick={() => handleDeleteMovie(movie.movieID)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesCRUD;
