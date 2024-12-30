package com.example.BookMyShow.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BookMyShow.Domain.CinemaHall;
import com.example.BookMyShow.Domain.CinemaSeat;
import com.example.BookMyShow.Domain.Enumeration.SeatType;
import com.example.BookMyShow.Repository.CinemaHallRepository;

@Service
public class CinemaHallService {

    private final CinemaHallRepository cinemaHallRepository;
    
    private final CinemaSeatService cinemaSeatService;

    @Autowired
    public CinemaHallService(CinemaHallRepository cinemaHallRepository, CinemaSeatService cinemaSeatService) {
        this.cinemaHallRepository = cinemaHallRepository;
        this.cinemaSeatService = cinemaSeatService;
    }

    public CinemaHall addCinemaHall(CinemaHall cinemaHall) {
        CinemaHall addedCinemaHall = cinemaHallRepository.save(cinemaHall);
        generateCinemaSeats(addedCinemaHall);
        return addedCinemaHall;    }

    public Optional<CinemaHall> getCinemaHallById(Integer cinemaHallID) {
        return cinemaHallRepository.findById(cinemaHallID);
    }

    public List<CinemaHall> getAllCinemaHalls() {
        return cinemaHallRepository.findAll();
    }
   
    public List<CinemaHall> getCinemaHallsByCinemaId(Integer cinemaID) {
        return cinemaHallRepository.findByCinema_CinemaID(cinemaID);
    }
    
    
    private void generateCinemaSeats(CinemaHall cinemaHall) {
        int totalSeats = cinemaHall.getTotalSeats();
        int seatsPerRow = 15;
        char row = 'A';

        for (int i = 1; i <= totalSeats; i++) {
            String seatNumber = row + String.valueOf((i - 1) % seatsPerRow + 1);

            SeatType seatType = (row == 'A') ? SeatType.VIP : SeatType.REGULAR;

            CinemaSeat cinemaSeat = new CinemaSeat();
            cinemaSeat.setSeatNumber(seatNumber);
            cinemaSeat.setType(seatType);
            cinemaSeat.setCinemaHall(cinemaHall);

            cinemaSeatService.createCinemaSeat(cinemaSeat);

            if (i % seatsPerRow == 0) {
                row++;
            }
        }
    }
    
    public void deleteCinemaHall(Integer cinemaHallID) {
        CinemaHall cinemaHall = cinemaHallRepository.findById(cinemaHallID)
                .orElseThrow(() -> new RuntimeException("CinemaHall not found with ID: " + cinemaHallID));

        cinemaHallRepository.delete(cinemaHall);
    }
    
    
    public CinemaHall updateCinemaHall(Integer cinemaHallID, CinemaHall updatedCinemaHall) {
        CinemaHall existingCinemaHall = cinemaHallRepository.findById(cinemaHallID)
                .orElseThrow(() -> new RuntimeException("CinemaHall not found with ID: " + cinemaHallID));

        existingCinemaHall.setName(updatedCinemaHall.getName());
        existingCinemaHall.setTotalSeats(updatedCinemaHall.getTotalSeats());

        return cinemaHallRepository.save(existingCinemaHall);
    }


    
}

