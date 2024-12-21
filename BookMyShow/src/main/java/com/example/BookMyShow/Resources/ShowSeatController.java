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

import com.example.BookMyShow.Domain.ShowSeat;
import com.example.BookMyShow.Service.ShowSeatService;

@RestController
@RequestMapping("/api/show-seats-update")
public class ShowSeatController {

    @Autowired
    private ShowSeatService showSeatService;

    @PostMapping("/add")
    public ResponseEntity<ShowSeat> createShowSeat(@RequestBody ShowSeat showSeat) {
        return ResponseEntity.ok(showSeatService.createShowSeat(showSeat));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ShowSeat>> getAllShowSeats() {
        return ResponseEntity.ok(showSeatService.getAllShowSeats());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShowSeat(@PathVariable Long id) {
        showSeatService.deleteShowSeat(id);
        return ResponseEntity.noContent().build();
    }
}

