import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './bookingDetails.css';

const BookingDetails = () => {
  const { bookingID } = useParams(); 
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(`http://localhost:8080/api/bookings/${bookingID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooking(response.data);
      })
      .catch((error) => {
        console.error('Error fetching booking details:', error);
        setError('Failed to fetch booking details. Please try again.');
      });
  }, [bookingID]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!booking) {
    return <p className="loading">Loading booking details...</p>;
  }

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="booking-details-container">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackButtonClick}>Back</button>
      </div>

      <h2>Booking Details</h2>

      <section className="details-section">
        <h3>Booking Information</h3>
        <p><strong>Booking ID:</strong> {booking.bookingID}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Number of Seats:</strong> {booking.numberOfSeats}</p>
        <p><strong>Timestamp:</strong> {new Date(booking.timestamp).toLocaleString()}</p>
      </section>

      <section className="details-section">
        <h3>User Details</h3>
        <p><strong>Name:</strong> {`${booking.user.firstName} ${booking.user.lastName}`}</p>
        <p><strong>Email:</strong> {booking.user.email}</p>
        <p><strong>Phone:</strong> {booking.user.phoneNumber}</p>
      </section>

      <section className="details-section">
        <h3>Show Details</h3>
        <p><strong>Movie:</strong> {booking.show.movie.title}</p>
        <p><strong>Description:</strong> {booking.show.movie.description}</p>
        <p><strong>Genre:</strong> {booking.show.movie.genre}</p>
        <p><strong>Duration:</strong> {booking.show.movie.duration}</p>
        <p><strong>Language:</strong> {booking.show.movie.language}</p>
        <p><strong>Release Date:</strong> {new Date(booking.show.movie.releaseDate).toLocaleDateString()}</p>
        <p><strong>Cinema Hall:</strong> {booking.show.cinemaHall.name}</p>
        <p><strong>Cinema:</strong> {booking.show.cinemaHall.cinema.name}</p>
        <p><strong>City:</strong> {booking.show.cinemaHall.cinema.city.name}, {booking.show.cinemaHall.cinema.city.state}</p>
      </section>

      <section className="details-section">
        <h3>Seat Details</h3>
        <ul className="seat-list">
          {booking.showSeats.map((seat) => (
            <li key={seat.showSeatID} className="seat-item">
              <p><strong>Seat Number:</strong> {seat.cinemaSeat.seatNumber}</p>
              <p><strong>Type:</strong> {seat.cinemaSeat.type}</p>
              <p><strong>Price:</strong> {seat.price}</p>
              <p><strong>Status:</strong> {seat.status}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BookingDetails;
