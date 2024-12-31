package com.example.BookMyShow.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BookMyShow.Domain.Cinema;
import com.example.BookMyShow.Domain.CinemaHall;
import com.example.BookMyShow.Repository.CinemaHallRepository;
import com.example.BookMyShow.Repository.CinemaRepository;
import com.example.BookMyShow.Repository.CinemaSeatRepository;

import jakarta.transaction.Transactional;

@Service
public class CinemaService {
    @Autowired
    private CinemaRepository cinemaRepository;
    
    @Autowired
    private CinemaHallRepository cinemaHallRepository ;
    
    @Autowired
    private CinemaSeatRepository cinemaSeatRepository ;

    public Cinema createCinema(Cinema cinema) {
        return cinemaRepository.save(cinema);
    }

    public List<Cinema> getAllCinemas() {
        return cinemaRepository.findAll();
    }

    
    @Transactional
    public void deleteCinema(Long cinemaID) {
        
        Integer cinemaIDInt = cinemaID.intValue(); 

        List<CinemaHall> cinemaHalls = cinemaHallRepository.findByCinema_CinemaID(cinemaIDInt);

        for (CinemaHall cinemaHall : cinemaHalls) {
            cinemaSeatRepository.deleteByCinemaHall_CinemaHallID(cinemaHall.getCinemaHallID());
        }
        cinemaHallRepository.deleteAll(cinemaHalls);
        cinemaRepository.deleteById(cinemaID); 
    }
    
    
    public Cinema updateCinema(Long id, Cinema updatedCinema) {
        return cinemaRepository.findById(id).map(existingCinema -> {
            existingCinema.setName(updatedCinema.getName());
            existingCinema.setTotalCinemaHalls(updatedCinema.getTotalCinemaHalls());
            existingCinema.setCity(updatedCinema.getCity());
            return cinemaRepository.save(existingCinema);
        }).orElseThrow(() -> new RuntimeException("Cinema not found with id " + id));
    }
}

