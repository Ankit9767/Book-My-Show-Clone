import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CinemasCRUD.css';

const CinemasCRUD = () => {
  const [cinemas, setCinemas] = useState([]);
  const [cities, setCities] = useState([]); 
  const [error, setError] = useState(null);
  const [newCinema, setNewCinema] = useState({ name: '', totalCinemaHalls: '', cityID: '' });
  const [editCinema, setEditCinema] = useState(null);

  useEffect(() => {
    fetchCinemas();
    fetchCities(); 
  }, []);

  const fetchCinemas = () => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:8080/api/cinemas/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCinemas(response.data))
      .catch((err) => setError('Failed to fetch cinemas.'));
  };

  const fetchCities = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:8080/api/cities/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCities(response.data))
      .catch((err) => setError('Failed to fetch cities.'));
  };

  const handleAddCinema = () => {
    const token = localStorage.getItem('token');

    const payload = {
      name: newCinema.name,
      totalCinemaHalls: newCinema.totalCinemaHalls,
      city: {
        cityID: newCinema.cityID,
      },
    };

    axios
      .post('http://localhost:8080/api/cinemas/create', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setNewCinema({ name: '', totalCinemaHalls: '', cityID: '' }); 
        fetchCinemas();
      })
      .catch((err) => setError('Failed to add cinema.'));
  };

  const handleUpdateCinema = () => {
    const token = localStorage.getItem('token');

    if (!editCinema.cityID || isNaN(editCinema.cityID)) {
      setError('Please select a valid city.');
      return;
    }

    const payload = {
      name: editCinema.name,
      totalCinemaHalls: parseInt(editCinema.totalCinemaHalls), 
      city: {
        cityID: parseInt(editCinema.cityID),
      },
    };

    axios
      .put(
        `http://localhost:8080/api/cinemas/update/${editCinema.cinemaID}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log('Update successful:', response.data);
        setEditCinema(null);
        fetchCinemas(); 
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to update cinema.');
      });
  };

  const handleDeleteCinema = (cinemaID) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:8080/api/cinemas/delete/${cinemaID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchCinemas())
      .catch((err) => setError('Failed to delete cinema.'));
  };

  return (
    <div className="cinemas-crud-container">
      <h2>Manage Cinemas</h2>
      {error && <p className="error-message">{error}</p>}

      {!editCinema && (
        <div className="add-cinema-section">
          <h3>Add Cinema</h3>
          <input
            type="text"
            placeholder="Cinema Name"
            value={newCinema.name}
            onChange={(e) => setNewCinema({ ...newCinema, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total Cinema Halls"
            value={newCinema.totalCinemaHalls}
            onChange={(e) =>
              setNewCinema({ ...newCinema, totalCinemaHalls: e.target.value })
            }
          />
          <select
            value={newCinema.cityID}
            onChange={(e) =>
              setNewCinema({ ...newCinema, cityID: e.target.value })
            }
          >
            <option value="" disabled>
              Select City
            </option>
            {cities.map((city) => (
              <option key={city.cityID} value={city.cityID}>
                {city.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddCinema}>Add Cinema</button>
        </div>
      )}

      {editCinema && (
        <div className="edit-cinema-section">
          <h3>Edit Cinema</h3>
          <input
            type="text"
            value={editCinema.name}
            onChange={(e) =>
              setEditCinema({ ...editCinema, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Total Cinema Halls"
            value={editCinema.totalCinemaHalls}
            onChange={(e) =>
              setEditCinema({
                ...editCinema,
                totalCinemaHalls: e.target.value,
              })
            }
          />
          <select
            value={editCinema.cityID || ''}
            onChange={(e) =>
              setEditCinema({
                ...editCinema,
                cityID: e.target.value,
              })
            }
          >
            <option value="" disabled>
              Select City
            </option>
            {cities.map((city) => (
              <option key={city.cityID} value={city.cityID}>
                {city.name}
              </option>
            ))}
          </select>

          <button onClick={handleUpdateCinema}>Update Cinema</button>
          <button
            className="cancel-button"
            onClick={() => setEditCinema(null)}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="cinemas-list">
        <h3>Cinema List</h3>
        {cinemas.map((cinema) => (
          <div key={cinema.cinemaID} className="cinema-item">
            <div>
              <h4>{cinema.name}</h4>
              <p>{cinema.location}</p>
            </div>
            <div className="cinema-actions">
              <button onClick={() => setEditCinema(cinema)}>Edit</button>
              <button onClick={() => handleDeleteCinema(cinema.cinemaID)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemasCRUD;
