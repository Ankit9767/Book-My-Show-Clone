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

import com.example.BookMyShow.DTO.BookingDTO;
import com.example.BookMyShow.Domain.Booking;
import com.example.BookMyShow.Service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/add")
    public ResponseEntity<Booking> createBooking(@RequestBody BookingDTO bookingDTO) {
    	return ResponseEntity.ok(bookingService.createBooking(bookingDTO));    }

    @GetMapping("/all")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/user/{userID}")
    public ResponseEntity<List<Booking>> getBookingsByUserID(@PathVariable Long userID) {
        List<Booking> userBookings = bookingService.getBookingsByUserID(userID);
        return ResponseEntity.ok(userBookings);
    }
    
    @GetMapping("/{bookingID}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long bookingID) {
        Booking booking = bookingService.getBookingById(bookingID);
        return ResponseEntity.ok(booking);
    }


}

