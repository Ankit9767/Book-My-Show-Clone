import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CinemaHallsCRUD = () => {
  const [cinemaHalls, setCinemaHalls] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [error, setError] = useState(null);
  const [newCinemaHall, setNewCinemaHall] = useState({ name: '', cinemaID: '', totalSeats: '' });
  const [editCinemaHall, setEditCinemaHall] = useState(null);

  useEffect(() => {
    fetchCinemaHalls();
    fetchCinemas(); 
  }, []);

  const fetchCinemaHalls = () => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:8080/api/cinema-halls/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCinemaHalls(response.data))
      .catch((err) => setError('Failed to fetch cinema halls.'));
  };

  const fetchCinemas = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:8080/api/cinemas/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCinemas(response.data))
      .catch((err) => setError('Failed to fetch cinemas.'));
  };

  const handleAddCinemaHall = () => {
    const token = localStorage.getItem('token');

    const payload = {
      name: newCinemaHall.name,
      totalSeats: newCinemaHall.totalSeats,
      cinema: { cinemaID: newCinemaHall.cinemaID },
    };

    axios
      .post('http://localhost:8080/api/cinema-halls/add', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setNewCinemaHall({ name: '', totalSeats: '', cinemaID: '' });
        fetchCinemaHalls();
      })
      .catch((err) => setError('Failed to add cinema hall.'));
  };

  const handleUpdateCinemaHall = () => {
    const token = localStorage.getItem('token');
    const payload = {
      name: editCinemaHall.name,
      totalSeats: parseInt(editCinemaHall.totalSeats),
      cinema: { cinemaID: parseInt(editCinemaHall.cinemaID) },
    };
  
    axios
      .put(
        `http://localhost:8080/api/cinema-halls/update/${editCinemaHall.cinemaHallID}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setEditCinemaHall(null);
        fetchCinemaHalls();
      })
      .catch((err) => setError('Failed to update cinema hall.'));
  };
  
  

  const handleDeleteCinemaHall = (cinemaHallID) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:8080/api/cinema-halls/delete/${cinemaHallID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchCinemaHalls();
      })
      .catch((err) => setError('Failed to delete cinema hall.'));
  };
  

  return (
    <div className="cinemas-crud-container">
      <h2>Manage Cinema Halls</h2>
      {error && <p className="error-message">{error}</p>}

      {!editCinemaHall && (
        <div className="add-cinema-section">
          <h3>Add Cinema Hall</h3>
          <input
            type="text"
            placeholder="Cinema Hall Name"
            value={newCinemaHall.name}
            onChange={(e) =>
              setNewCinemaHall({ ...newCinemaHall, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Total Seats"
            value={newCinemaHall.totalSeats}
            onChange={(e) =>
              setNewCinemaHall({ ...newCinemaHall, totalSeats: e.target.value })
            }
          />
          <select
            value={newCinemaHall.cinemaID}
            onChange={(e) =>
              setNewCinemaHall({ ...newCinemaHall, cinemaID: e.target.value })
            }
          >
            <option value="" disabled>
              Select Cinema
            </option>
            {cinemas.map((cinema) => (
              <option key={cinema.cinemaID} value={cinema.cinemaID}>
                {cinema.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddCinemaHall}>Add Cinema Hall</button>
        </div>
      )}

      {editCinemaHall && (
        <div className="edit-cinema-section">
          <h3>Edit Cinema Hall</h3>
          <input
            type="text"
            value={editCinemaHall.name}
            onChange={(e) =>
              setEditCinemaHall({ ...editCinemaHall, name: e.target.value })
            }
          />
          <input
            type="number"
            value={editCinemaHall.totalSeats}
            onChange={(e) =>
              setEditCinemaHall({
                ...editCinemaHall,
                totalSeats: e.target.value,
              })
            }
          />
          <select
            value={editCinemaHall.cinemaID || ''}
            onChange={(e) =>
              setEditCinemaHall({ ...editCinemaHall, cinemaID: e.target.value })
            }
          >
            <option value="" disabled>
              Select Cinema
            </option>
            {cinemas.map((cinema) => (
              <option key={cinema.cinemaID} value={cinema.cinemaID}>
                {cinema.name}
              </option>
            ))}
          </select>
          <button onClick={handleUpdateCinemaHall}>Update Cinema Hall</button>
          <button
            className="cancel-button"
            onClick={() => setEditCinemaHall(null)}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="cinemas-list">
        <h3>Cinema Hall List</h3>
        {cinemaHalls.map((cinemaHall) => (
          <div key={cinemaHall.cinemaHallID} className="cinema-item">
            <div>
              <h4>{cinemaHall.name}</h4>
              <p>Total Seats: {cinemaHall.totalSeats}</p>
            </div>
            <div className="cinema-actions">
              <button onClick={() => setEditCinemaHall(cinemaHall)}>Edit</button>
              <button onClick={() => handleDeleteCinemaHall(cinemaHall.cinemaHallID)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaHallsCRUD;
