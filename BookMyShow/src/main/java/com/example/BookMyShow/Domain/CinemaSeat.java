package com.example.BookMyShow.Domain;

import com.example.BookMyShow.Domain.Enumeration.SeatType;

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
@Table(name = "Cinema_Seat")
public class CinemaSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cinemaSeatID;

    private String seatNumber;

    @Enumerated(EnumType.STRING)
    private SeatType type;

    @ManyToOne
    @JoinColumn(name = "cinemaHallID")
    private CinemaHall cinemaHall;

	public CinemaSeat(Integer cinemaSeatID, String seatNumber, SeatType type, CinemaHall cinemaHall)
	{

		this.cinemaSeatID = cinemaSeatID;
		this.seatNumber = seatNumber;
		this.type = type;
		this.cinemaHall = cinemaHall;
	}

	public CinemaSeat() {
		super();
	}

	public Integer getCinemaSeatID() {
		return cinemaSeatID;
	}

	public void setCinemaSeatID(Integer cinemaSeatID) {
		this.cinemaSeatID = cinemaSeatID;
	}

	public String getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(String seatNumber) {
		this.seatNumber = seatNumber;
	}

	public SeatType getType() {
		return type;
	}

	public void setType(SeatType type) {
		this.type = type;
	}

	public CinemaHall getCinemaHall() {
		return cinemaHall;
	}

	public void setCinemaHall(CinemaHall cinemaHall) {
		this.cinemaHall = cinemaHall;
	}
    
    
}

