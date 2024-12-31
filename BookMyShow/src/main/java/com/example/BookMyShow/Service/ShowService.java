package com.example.BookMyShow.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BookMyShow.Domain.CinemaSeat;
import com.example.BookMyShow.Domain.Show;
import com.example.BookMyShow.Domain.ShowSeat;
import com.example.BookMyShow.Domain.Enumeration.SeatStatus;
import com.example.BookMyShow.Repository.CinemaSeatRepository;
import com.example.BookMyShow.Repository.ShowRepository;
import com.example.BookMyShow.Repository.ShowSeatRepository;

import jakarta.transaction.Transactional;

@Service
public class ShowService {

    @Autowired
    private ShowRepository showRepository;
    
    @Autowired
    private ShowSeatRepository showSeatRepository ;
    
    @Autowired
    private CinemaSeatRepository cinemaSeatRepository;

    public Show createShow(Show show) {
        Show savedShow = showRepository.save(show);

        createShowSeatsForCinemaHall(savedShow);
        return savedShow;    
        
    }

    public List<Show> getAllShows() {
        return showRepository.findAll();
    }

    @Transactional
    public void deleteShow(Long id) {
        Show show = showRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Show not found"));
        
        showSeatRepository.deleteByShow(show);
      
        showRepository.delete(show);
    }

    
    public Show updateShow(Long showId, Show updatedShow) {
        Show existingShow = showRepository.findById(showId)
                .orElseThrow(() -> new RuntimeException("Show not found"));
        existingShow.setMovie(updatedShow.getMovie());
        existingShow.setDate(updatedShow.getDate());
        return showRepository.save(existingShow);
    }
    
    public List<Show> getShowsByCinemaHallId(Integer cinemaHallID) {
        return showRepository.findByCinemaHall_CinemaHallID(cinemaHallID);
    }
    
    public List<ShowSeat> getSeatsByShowId(Long showId) {
        Show show = showRepository.findById(showId)
                .orElseThrow(() -> new RuntimeException("Show not found"));
        return showSeatRepository.findByShow(show);
    }
    
    
    private void createShowSeatsForCinemaHall(Show show) {
        List<CinemaSeat> cinemaSeats = cinemaSeatRepository.findByCinemaHall_CinemaHallID(show.getCinemaHall().getCinemaHallID());

        for (CinemaSeat cinemaSeat : cinemaSeats) {
            ShowSeat showSeat = new ShowSeat();
            showSeat.setCinemaSeat(cinemaSeat);
            showSeat.setShow(show);
            showSeat.setPrice(determineSeatPrice(cinemaSeat)); 
            showSeat.setStatus(SeatStatus.AVAILABLE);

            showSeatRepository.save(showSeat);
        }
    }
    
    
    
    private Double determineSeatPrice(CinemaSeat cinemaSeat) {
        switch (cinemaSeat.getType()) {
            case VIP:
                return 300.0;
            case PREMIUM:
                return 200.0;
            default: // REGULAR
                return 150.0;
        }
    }
    
    public List<Show> getShowsByMovieId(Long movieID) {
        return showRepository.findByMovie_MovieID(movieID);
    }
    
    
    public List<Show> getShowsByCinemaHallAndMovie(Integer cinemaHallID, Long movieID) {
        return showRepository.findByCinemaHall_CinemaHallIDAndMovie_MovieID(cinemaHallID, movieID);
    }
}

