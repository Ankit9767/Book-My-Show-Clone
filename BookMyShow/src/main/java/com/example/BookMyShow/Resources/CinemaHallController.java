package com.example.BookMyShow.Resources;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BookMyShow.Domain.CinemaHall;
import com.example.BookMyShow.Domain.CinemaSeat;
import com.example.BookMyShow.Repository.CinemaHallRepository;
import com.example.BookMyShow.Service.CinemaHallService;
import com.example.BookMyShow.Service.CinemaSeatService;

@RestController
@RequestMapping("/api/cinema-halls")
public class CinemaHallController {

    private final CinemaHallService cinemaHallService;
    
    private final CinemaSeatService cinemaSeatService ;
    
    private final CinemaHallRepository cinemaHallRepository ;

    @Autowired
    public CinemaHallController(CinemaHallService cinemaHallService , CinemaSeatService cinemaSeatService, CinemaHallRepository cinemaHallRepository) {
        this.cinemaHallService = cinemaHallService;
        this.cinemaSeatService = cinemaSeatService ;
        this.cinemaHallRepository = cinemaHallRepository ;
    }

    @PostMapping("/add")
    public ResponseEntity<CinemaHall> addCinemaHall(@RequestBody CinemaHall cinemaHall) {
        CinemaHall addedCinemaHall = cinemaHallService.addCinemaHall(cinemaHall);
        return new ResponseEntity<>(addedCinemaHall, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CinemaHall>> getAllCinemaHalls() {
        List<CinemaHall> cinemaHalls = cinemaHallService.getAllCinemaHalls();
        return new ResponseEntity<>(cinemaHalls, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CinemaHall> getCinemaHallById(@PathVariable("id") Integer cinemaHallID) {
        Optional<CinemaHall> cinemaHall = cinemaHallService.getCinemaHallById(cinemaHallID);
        return cinemaHall.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    
    @GetMapping("/cinema/{cinemaId}")
    public ResponseEntity<List<CinemaHall>> getCinemaHallsByCinemaId(@PathVariable("cinemaId") Integer cinemaID) {
        List<CinemaHall> cinemaHalls = cinemaHallService.getCinemaHallsByCinemaId(cinemaID);
        if (!cinemaHalls.isEmpty()) {
            return new ResponseEntity<>(cinemaHalls, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteCinemaHall(@PathVariable("id") Integer cinemaHallID) {
        
        CinemaHall cinemaHall = cinemaHallRepository.findById(cinemaHallID)
                .orElseThrow(() -> new RuntimeException("CinemaHall not found with ID: " + cinemaHallID));
        
            List<CinemaSeat> cinemaSeats = cinemaSeatService.getCinemaSeatsByCinemaHallID(cinemaHallID);

        for (CinemaSeat cinemaSeat : cinemaSeats) {
            cinemaSeatService.deleteCinemaSeat(cinemaSeat.getCinemaSeatID().longValue()); 
        }

        cinemaHallRepository.delete(cinemaHall);
    }


    
    @PutMapping("/update/{id}")
    public ResponseEntity<CinemaHall> updateCinemaHall(@PathVariable("id") Integer cinemaHallID, 
                                                       @RequestBody CinemaHall updatedCinemaHall) {
        try {
            CinemaHall updatedHall = cinemaHallService.updateCinemaHall(cinemaHallID, updatedCinemaHall);
            return ResponseEntity.ok(updatedHall);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    
}

