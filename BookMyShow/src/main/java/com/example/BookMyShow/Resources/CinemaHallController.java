package com.example.BookMyShow.Resources;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BookMyShow.Domain.CinemaHall;
import com.example.BookMyShow.Service.CinemaHallService;

@RestController
@RequestMapping("/api/cinema-halls")
public class CinemaHallController {

    private final CinemaHallService cinemaHallService;

    @Autowired
    public CinemaHallController(CinemaHallService cinemaHallService) {
        this.cinemaHallService = cinemaHallService;
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

}

