import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/dashboard/Dashboard";
import BasePage from "./Components/BasePage/BasePage";
import Movies from "./Components/movies/movies"; 
import CinemaHalls from './Components/cinemaHall/cinemaHall';
import Bookings from './Components/bookings/Bookings';
import Profile from './Components/Profile/Profile';
import Cinemas from './Components/Cinema/cinema';
import Shows from './Components/Shows/Shows';
import BookingForm from './Components/bookings/BookingForm';
import BookingDetails from './Components/bookings/BookingDetails';
import MovieDetails from './Components/movies/MovieDetails';
import AddMovie from './Components/movies/AddMovie';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Admin from './Components/Admin/Admin';
import CinemasCRUD from './Components/Admin/CinemasCRUD';
import CinemaHallsCRUD from './Components/Admin/CinemaHallsCRUD';
import MoviesCRUD from './Components/Admin/MoviesCRUD';
import ShowsCRUD from './Components/Admin/ShowsCRUD';

function App() {

  return (

    <div className="App">
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/basepage" />} />

            <Route path="/basepage" element={<BasePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Navigate to="/dashboard/movies" />} />
            
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route path="admin" element={<Admin />} />
              <Route path="admin/cinemas" element={<CinemasCRUD />} />
              <Route path="admin/cinema-halls" element={<CinemaHallsCRUD />} />
              <Route path="admin/movies" element={<MoviesCRUD />} />
              <Route path="admin/shows" element={<ShowsCRUD />} />
              <Route path="movies" element={<Movies />} />
              <Route path="movies/add" element={<AddMovie />} />
              <Route path="shows/:movieID" element={<Shows />} />
              <Route path="movies/:movieID" element={<MovieDetails />} />
              <Route path="cinemaHall" element={<CinemaHalls />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="profile" element={<Profile />} />
              <Route path="cinema" element={<Cinemas />} />
              <Route path="cinemaHalls/:cinemaHallID/shows" element={<Shows />} />
              <Route path="booking/:showID" element={<BookingForm />} />
              <Route path="bookings/:bookingID" element={<BookingDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
