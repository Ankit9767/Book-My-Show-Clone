package com.example.BookMyShow.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BookMyShow.DTO.BookingDTO;
import com.example.BookMyShow.Domain.Booking;
import com.example.BookMyShow.Domain.OrgUser;
import com.example.BookMyShow.Domain.Show;
import com.example.BookMyShow.Domain.ShowSeat;
import com.example.BookMyShow.Domain.Enumeration.BookingStatus;
import com.example.BookMyShow.Domain.Enumeration.SeatStatus;
import com.example.BookMyShow.Repository.BookingRepository;
import com.example.BookMyShow.Repository.OrgUserRepository;
import com.example.BookMyShow.Repository.ShowRepository;
import com.example.BookMyShow.Repository.ShowSeatRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private ShowSeatRepository showSeatRepository;
    
    @Autowired
    private ShowRepository showRepository;
    
    @Autowired
    private OrgUserRepository orgUserRepository;
    

    public Booking createBooking(BookingDTO bookingDTO) {
    
    	 Booking booking = new Booking();
    	 
    	 
         OrgUser user = orgUserRepository.findById(bookingDTO.getUserID())
                 .orElseThrow(() -> new RuntimeException("User not found"));
         booking.setUser(user);
         
    	 
         booking.setNumberOfSeats(bookingDTO.getNumberOfSeats());
         if (booking.getStatus() == null) {
             booking.setStatus(BookingStatus.PENDING);
         } 
         
         
         booking.setTimestamp(LocalDateTime.now());
         	
         
         Show show = showRepository.findById(bookingDTO.getShowID()) 
                 .orElseThrow(() -> new RuntimeException("Show not found"));

         booking.setShow(show);
        
        Booking savedBooking = bookingRepository.save(booking);
        

        savedBooking.setStatus(BookingStatus.CONFIRMED);
        savedBooking = bookingRepository.save(savedBooking);

        
        List<ShowSeat> showSeatsToBook = showSeatRepository.findByShowSeatIDIn(bookingDTO.getSelectedShowSeatIDs()); 
        	booking.setShowSeats(showSeatsToBook);
        	
        for (ShowSeat showSeat : showSeatsToBook) {
            if (showSeat.getStatus() == SeatStatus.AVAILABLE) {
            	
                showSeat.setStatus(SeatStatus.BOOKED);  
                showSeat.setBooking(savedBooking);  
                showSeatRepository.save(showSeat); 
            } 
            else {
                throw new RuntimeException("Seat is already booked or unavailable.");
            }
        }

        return savedBooking;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
    
    public List<Booking> getBookingsByUserID(Long userID) {
        return bookingRepository.findByUserId(userID);
    }
    
    public Booking getBookingById(Long bookingID) {
        return bookingRepository.findById(bookingID)
            .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingID));
    }


    
}

