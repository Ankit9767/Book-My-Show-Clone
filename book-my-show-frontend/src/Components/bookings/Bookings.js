import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './bookings.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if (!userID) {
      setError('User ID not found. Please log in again.');
      return;
    }

    axios
      .get(`http://localhost:8080/api/bookings/user/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBookings(response.data);
        console.log('User-specific bookings:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings. Please check your credentials or try again.');
      });
  }, []);

  const handleBookingClick = (bookingID) => {
    navigate(`/dashboard/bookings/${bookingID}`);
  };

  return (
    <div className="bookings-container">
      <h2>Your Bookings</h2>
      {error && <p>{error}</p>}

      <div className="bookings-grid">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking.bookingID}
              className="booking-card"
              onClick={() => handleBookingClick(booking.bookingID)}
            >
              <h4 className="booking-id">Booking ID: {booking.bookingID}</h4>
              <h5 className="movie-name">Movie: {booking.show.movie.title}</h5>
              <p className="show-date">Date: {new Date(booking.show.startTime).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
    </div>
  );
};

export default Bookings;
