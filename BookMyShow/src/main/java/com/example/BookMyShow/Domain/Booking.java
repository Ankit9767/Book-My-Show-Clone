package com.example.BookMyShow.Domain;

import java.time.LocalDateTime;
import java.util.List;

import com.example.BookMyShow.Domain.Enumeration.BookingStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingID;

    private Integer numberOfSeats;

    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @ManyToOne
    @JoinColumn(name = "userID")
    private OrgUser user;

    @ManyToOne
    @JoinColumn(name = "showID")
    private Show show;
    
    @OneToMany(mappedBy = "booking")
    private List<ShowSeat> showSeats;
    
    

	public Booking(Integer bookingID, Integer numberOfSeats, LocalDateTime timestamp, BookingStatus status,
				OrgUser user, Show show, List<ShowSeat> showSeats) 
	{
		this.bookingID = bookingID;
		this.numberOfSeats = numberOfSeats;
		this.timestamp = timestamp;
		this.status = status;
		this.user = user;
		this.show = show;
		this.showSeats = showSeats;
	}

	public Booking() {
		super();
	}

	public Integer getBookingID() {
		return bookingID;
	}

	public void setBookingID(Integer bookingID) {
		this.bookingID = bookingID;
	}

	public Integer getNumberOfSeats() {
		return numberOfSeats;
	}

	public void setNumberOfSeats(Integer numberOfSeats) {
		this.numberOfSeats = numberOfSeats;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public BookingStatus getStatus() {
		return status;
	}

	public void setStatus(BookingStatus status) {
		this.status = status;
	}

	public OrgUser getUser() {
		return user;
	}

	public void setUser(OrgUser user) {
		this.user = user;
	}

	public Show getShow() {
		return show;
	}

	public void setShow(Show show) {
		this.show = show;
	}

	public List<ShowSeat> getShowSeats() {
		return showSeats;
	}

	public void setShowSeats(List<ShowSeat> showSeats) {
		this.showSeats = showSeats;
	}

}

