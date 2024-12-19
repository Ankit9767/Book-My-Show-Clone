package com.example.BookMyShow.Resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BookMyShow.Domain.CinemaSeat;
import com.example.BookMyShow.Service.CinemaSeatService;

@RestController
@RequestMapping("/api/cinema-seats")
public class CinemaSeatController {

    @Autowired
    private CinemaSeatService cinemaSeatService;

    @PostMapping("/add")
    public ResponseEntity<CinemaSeat> createCinemaSeat(@RequestBody CinemaSeat cinemaSeat) {
        return ResponseEntity.ok(cinemaSeatService.createCinemaSeat(cinemaSeat));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CinemaSeat>> getAllCinemaSeats() {
        return ResponseEntity.ok(cinemaSeatService.getAllCinemaSeats());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCinemaSeat(@PathVariable Long id) {
        cinemaSeatService.deleteCinemaSeat(id);
        return ResponseEntity.noContent().build();
    }
}

