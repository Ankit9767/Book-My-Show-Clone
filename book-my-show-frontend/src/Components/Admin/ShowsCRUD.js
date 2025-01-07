import React, { useState, useEffect } from "react";
import axios from "axios";
import './ShowsCRUD.css';

const ShowsCRUD = () => {
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [cinemaHalls, setCinemaHalls] = useState([]);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState({
    date: "",
    startTime: "",
    endTime: "",
    movieID: "",
    cinemaHallID: "",
  });
  const [editShow, setEditShow] = useState(null);

  useEffect(() => {
    fetchShows();
    fetchMovies();
    fetchCinemaHalls();
  }, []);

  const fetchShows = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/shows/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setShows(response.data))
      .catch((err) => setError("Failed to fetch shows."));
  };

  const fetchMovies = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/movies/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setMovies(response.data))
      .catch((err) => setError("Failed to fetch movies."));
  };

  const fetchCinemaHalls = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/cinema-halls/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCinemaHalls(response.data))
      .catch((err) => setError("Failed to fetch cinema halls."));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShowDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditShow = (show) => {
    setEditShow(show);
    setShowDetails({
      date: show.date.slice(0, 10), 
      startTime: show.startTime.slice(11, 19), 
      endTime: show.endTime.slice(11, 19),
      movieID: show.movie.movieID,
      cinemaHallID: show.cinemaHall.cinemaHallID,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    let payload = { ...showDetails };
  
    if (showDetails.date && showDetails.startTime && showDetails.endTime) {
      const [startHour, startMinute] = showDetails.startTime.split(":");
      const [endHour, endMinute] = showDetails.endTime.split(":");
  
      const startDateTime = new Date(showDetails.date);
      startDateTime.setHours(startHour, startMinute, 0);
  
      const endDateTime = new Date(showDetails.date);
      endDateTime.setHours(endHour, endMinute, 0);
  
      payload.startTime = startDateTime.toISOString().slice(0, 19);
      payload.endTime = endDateTime.toISOString().slice(0, 19);
  
      payload.date = showDetails.date + "T00:00:00";
    }
  
    payload.movie = { movieID: parseInt(showDetails.movieID) };
    payload.cinemaHall = { cinemaHallID: parseInt(showDetails.cinemaHallID) };
  
    if (editShow) {
      axios
        .put(
          `http://localhost:8080/api/shows/update/${editShow.showID}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setEditShow(null);
          setShowDetails({
            date: "",
            startTime: "",
            endTime: "",
            movieID: "",
            cinemaHallID: "",
          });
          fetchShows();
        })
        .catch((err) => setError("Failed to update show."));
    } else {
      axios
        .post("http://localhost:8080/api/shows/add", payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setShowDetails({
            date: "",
            startTime: "",
            endTime: "",
            movieID: "",
            cinemaHallID: "",
          });
          fetchShows();
        })
        .catch((err) => setError("Failed to add show."));
    }
  };
  

  const handleDeleteShow = (showID) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8080/api/shows/${showID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchShows())
      .catch((err) => setError("Failed to delete show."));
  };

  return (
    <div className="shows-crud-container">
      <h2>Manage Shows</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="add-show-section">
        <h3>{editShow ? "Edit Show" : "Add Show"}</h3>
        <form className="add-show-form" onSubmit={handleSubmit}>
          <div className="add-show-form-group">
            <label className="add-show-form-label" htmlFor="date">
              Show Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="add-show-form-input"
              value={showDetails.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-show-form-group">
            <label className="add-show-form-label" htmlFor="startTime">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              className="add-show-form-input"
              value={showDetails.startTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-show-form-group">
            <label className="add-show-form-label" htmlFor="endTime">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              className="add-show-form-input"
              value={showDetails.endTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-show-form-group">
            <label className="add-show-form-label" htmlFor="movieID">
              Movie
            </label>
            <select
              id="movieID"
              name="movieID"
              value={showDetails.movieID}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Movie</option>
              {movies.map((movie) => (
                <option key={movie.movieID} value={movie.movieID}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className="add-show-form-group">
            <label className="add-show-form-label" htmlFor="cinemaHallID">
              Cinema Hall
            </label>
            <select
              id="cinemaHallID"
              name="cinemaHallID"
              value={showDetails.cinemaHallID}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Cinema Hall</option>
              {cinemaHalls.map((cinemaHall) => (
                <option key={cinemaHall.cinemaHallID} value={cinemaHall.cinemaHallID}>
                  {cinemaHall.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-show-btn-submit">
            {editShow ? "Update Show" : "Add Show"}
          </button>
        </form>
      </div>

      <div className="shows-list">
        <h3>Show List</h3>
        {shows.map((show) => (
          <div key={show.showID} className="show-item">
            <div>
              <h4>{show.movie.title}</h4>
              <p>Show Date: {show.date.slice(0, 10)}</p>
              <p>Start Time: {show.startTime.slice(11, 19)}</p>
              <p>End Time: {show.endTime.slice(11, 19)}</p>
            </div>
            <div className="show-actions">
              <button onClick={() => handleEditShow(show)}>Edit</button>
              <button onClick={() => handleDeleteShow(show.showID)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowsCRUD;
