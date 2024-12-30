package com.example.BookMyShow.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BookMyShow.Domain.CinemaSeat;
import com.example.BookMyShow.Repository.CinemaSeatRepository;

@Service
public class CinemaSeatService {

    @Autowired
    private CinemaSeatRepository cinemaSeatRepository;

    public CinemaSeat createCinemaSeat(CinemaSeat cinemaSeat) {
        return cinemaSeatRepository.save(cinemaSeat);
    }

    public List<CinemaSeat> getAllCinemaSeats() {
        return cinemaSeatRepository.findAll();
    }

    public void deleteCinemaSeat(Long id) {
        cinemaSeatRepository.deleteById(id);
    }
    
    public List<CinemaSeat> getCinemaSeatsByCinemaHallID(Integer cinemaHallID) {
        return cinemaSeatRepository.findByCinemaHall_CinemaHallID(cinemaHallID);
    }
    
}

