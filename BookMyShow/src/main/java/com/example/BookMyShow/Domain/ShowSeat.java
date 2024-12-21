package com.example.BookMyShow.Domain;

import com.example.BookMyShow.Domain.Enumeration.SeatStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Show_Seat")
public class ShowSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer showSeatID;

    @Enumerated(EnumType.STRING)
    private SeatStatus status;

    private Double price;

    @ManyToOne
    @JoinColumn(name = "cinemaSeatID")
    private CinemaSeat cinemaSeat;

    @ManyToOne
    @JoinColumn(name = "showID")
    private Show show;

    @ManyToOne
    @JoinColumn(name = "bookingID", nullable = true)
    @JsonBackReference
    private Booking booking;
    

	public ShowSeat(Integer showSeatID, SeatStatus status, Double price, CinemaSeat cinemaSeat, Show show,
			Booking booking) 
	{
		this.showSeatID = showSeatID;
		this.status = status;
		this.price = price;
		this.cinemaSeat = cinemaSeat;
		this.show = show;
		this.booking = booking;
	}

	public ShowSeat() {
		super();
	}

	public Integer getShowSeatID() {
		return showSeatID;
	}

	public void setShowSeatID(Integer showSeatID) {
		this.showSeatID = showSeatID;
	}

	public SeatStatus getStatus() {
		return status;
	}

	public void setStatus(SeatStatus status) {
		this.status = status;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public CinemaSeat getCinemaSeat() {
		return cinemaSeat;
	}

	public void setCinemaSeat(CinemaSeat cinemaSeat) {
		this.cinemaSeat = cinemaSeat;
	}

	public Show getShow() {
		return show;
	}

	public void setShow(Show show) {
		this.show = show;
	}

	public Booking getBooking() {
		return booking;
	}

	public void setBooking(Booking booking) {
		this.booking = booking;
	}

}

