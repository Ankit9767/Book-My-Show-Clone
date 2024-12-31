package com.example.BookMyShow.Resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BookMyShow.Domain.Show;
import com.example.BookMyShow.Domain.ShowSeat;
import com.example.BookMyShow.Service.ShowService;

@RestController
@RequestMapping("/api/shows")
public class ShowController {

    @Autowired
    private ShowService showService;

    @PostMapping("/add")
    public ResponseEntity<Show> createShow(@RequestBody Show show) {
        return ResponseEntity.ok(showService.createShow(show));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Show>> getAllShows() {
        return ResponseEntity.ok(showService.getAllShows());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShow(@PathVariable Long id) {
        showService.deleteShow(id);
        return ResponseEntity.noContent().build();
    }
    
    // Update show
    @PutMapping("/update/{id}")
    public Show updateShow(@PathVariable Long id, @RequestBody Show updatedShow) {
        return showService.updateShow(id, updatedShow);
    }
    
    @GetMapping("/cinema-Hall/{cinemaHallID}")
    public ResponseEntity<List<Show>> getShowsByCinemaHallId(@PathVariable Integer cinemaHallID) {
        List<Show> shows = showService.getShowsByCinemaHallId(cinemaHallID);
        if (shows.isEmpty()) {
            System.out.println("No shows found for cinema hall ID: " + cinemaHallID);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(shows);
    }
    
    @GetMapping("/{showID}/seats")
    public ResponseEntity<List<ShowSeat>> getSeatsByShowId(@PathVariable Long showID) {
        List<ShowSeat> seats = showService.getSeatsByShowId(showID);
        return ResponseEntity.ok(seats);
    }
    
    
    @GetMapping("/movie/{movieID}")
    public ResponseEntity<List<Show>> getShowsByMovieId(@PathVariable Long movieID) {
        List<Show> shows = showService.getShowsByMovieId(movieID);
        if (shows.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(shows);
    }
    
    @GetMapping("/cinema-Hall/{cinemaHallID}/movie/{movieID}")
    public ResponseEntity<List<Show>> getShowsByCinemaHallAndMovie(
        @PathVariable Integer cinemaHallID,
        @PathVariable Long movieID) {
        List<Show> shows = showService.getShowsByCinemaHallAndMovie(cinemaHallID, movieID);
        return shows.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(shows);
    }
}

