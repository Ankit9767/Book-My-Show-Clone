import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = () => {
  const { showID } = useParams(); 
  const navigate = useNavigate();
  
  const [showDetails, setShowDetails] = useState(null);
  const [numberOfSeats, setNumberOfSeats] = useState(0); 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState(null);

  const seatSelectionRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserID = localStorage.getItem('userID');
    
    if (storedUserID) {
      setUserID(storedUserID);
    }

    axios
      .get(`http://localhost:8080/api/shows/${showID}/seats`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          alert('No shows available at the moment.');
        } else {
          setShowDetails(response.data); 
        }
      })
      .catch((error) => {
        console.error('Error fetching show details:', error);
        setError('Failed to fetch show details.');
      });
  }, [showID]);

  const getAvailableSeatsCount = () => {
    if (showDetails) {
      return showDetails.filter(seat => seat.status === 'AVAILABLE').length;
    }
    return 0;
  };

  const selectAvailableSeats = (seats, count) => {
    const availableSeats = seats.filter(seat => seat.status === 'AVAILABLE');
    const automaticallySelectedSeats = availableSeats.slice(0, count).map(seat => seat.showSeatID);
    setSelectedSeats(automaticallySelectedSeats);
  };

  const handleSeatSelection = (seatID) => {
    if (selectedSeats.includes(seatID)) {
      setSelectedSeats(prevSelected => prevSelected.filter(id => id !== seatID));
    } else {
      if (selectedSeats.length < numberOfSeats) {
        setSelectedSeats(prevSelected => [...prevSelected, seatID]);
      } else {
        setSelectedSeats(prevSelected => [...prevSelected.slice(1), seatID]);
      }
    }
  };

  const handleBookingSubmit = () => {
    if (selectedSeats.length < numberOfSeats) {
      alert(`Please select at least ${numberOfSeats} seats.`);
      return;
    }

    const token = localStorage.getItem('token');
    
    if (!userID) {
      setError('User not logged in.');
      return;
    }

    const bookingData = {
      numberOfSeats,
      userID,
      showID,
      selectedShowSeatIDs: selectedSeats,
    };

    axios
      .post('http://localhost:8080/api/bookings/add', bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Booking successful!');
        navigate('/dashboard/bookings'); 
      })
      .catch((error) => {
        console.error('Error creating booking:', error);
        setError('Failed to create booking.');
      });
  };

  const handleSeatNumberChange = (e) => {
    const seatCount = Number(e.target.value);
    
    if (seatCount <= getAvailableSeatsCount()) {
      setNumberOfSeats(seatCount);
      setSelectedSeats([]); 
      selectAvailableSeats(showDetails, seatCount); 
  
      if (seatCount >= 1) {
        setTimeout(() => {
          if (seatSelectionRef.current) {
            seatSelectionRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1000); 
      }
    } else {
      alert('Entered seats exceed available seats.');
    }
  };
  
  

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="booking-form-container">
      {error && <p>{error}</p>}

      {showDetails ? (
        <>
          <h2>Book Tickets for {showDetails[0].show.movie.title}</h2>
          <p><strong>Showtime:</strong> {showDetails[0].show.startTime}</p>
          <p><strong>End Time:</strong> {showDetails[0].show.endTime}</p>
          <p><strong>Seats Available:</strong> {getAvailableSeatsCount()}</p>

          <div>
            <label>
              Number of Seats:
              <input
                type="number"
                min="1"
                max={getAvailableSeatsCount()} 
                value={numberOfSeats}
                onChange={handleSeatNumberChange}
              />
            </label>
          </div>

          <div className="seat-selection" ref={seatSelectionRef}>
            {showDetails.map((seat) => (
              <button
                key={seat.showSeatID}
                className={`seat-button 
                  ${selectedSeats.includes(seat.showSeatID) ? 'selected' : ''} 
                  ${seat.status === 'BOOKED' ? 'booked' : ''}`}
                onClick={() => handleSeatSelection(seat.showSeatID)}
                disabled={seat.status === 'BOOKED' || numberOfSeats === 0}
              >
                {seat.cinemaSeat.seatNumber}
              </button>
            ))}
          </div>

          <div className="theater-screen">
            <span>SCREEN</span>
          </div>

          <div className="confirm-cancel-button-container">
            <button className="confirm-button" onClick={handleBookingSubmit}>
              Confirm Booking
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel Booking
            </button>
          </div>
        </>
      ) : (
        <p>Loading show details...</p>
      )}
    </div>
  );
};

export default BookingForm;
