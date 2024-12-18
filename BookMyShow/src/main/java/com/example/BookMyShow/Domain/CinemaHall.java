package com.example.BookMyShow.Domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Cinema_Hall")
public class CinemaHall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cinemaHallID;

    private String name;
    private Integer totalSeats;

    @ManyToOne
    @JoinColumn(name = "cinemaID")
    private Cinema cinema;

	public CinemaHall(Integer cinemaHallID, String name, Integer totalSeats, Cinema cinema) 
	{
		
		this.cinemaHallID = cinemaHallID;
		this.name = name;
		this.totalSeats = totalSeats;
		this.cinema = cinema;
	}

	public CinemaHall() {
		super();
	}

	public Integer getCinemaHallID() {
		return cinemaHallID;
	}

	public void setCinemaHallID(Integer cinemaHallID) {
		this.cinemaHallID = cinemaHallID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getTotalSeats() {
		return totalSeats;
	}

	public void setTotalSeats(Integer totalSeats) {
		this.totalSeats = totalSeats;
	}

	public Cinema getCinema() {
		return cinema;
	}

	public void setCinema(Cinema cinema) {
		this.cinema = cinema;
	}
    
}

