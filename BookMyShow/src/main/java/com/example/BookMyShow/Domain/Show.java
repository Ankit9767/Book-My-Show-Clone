package com.example.BookMyShow.Domain;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Movie_Show")
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer showID;

    private LocalDateTime date;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "movieID")
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "cinemaHallID")
    private CinemaHall cinemaHall;

	public Show(Integer showID, LocalDateTime date, LocalDateTime startTime, LocalDateTime endTime, Movie movie,
			CinemaHall cinemaHall) 
	{
		this.showID = showID;
		this.date = date;
		this.startTime = startTime;
		this.endTime = endTime;
		this.movie = movie;
		this.cinemaHall = cinemaHall;
	}

	public Show() {
		super();
	}

	public Integer getShowID() {
		return showID;
	}

	public void setShowID(Integer showID) {
		this.showID = showID;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	public CinemaHall getCinemaHall() {
		return cinemaHall;
	}

	public void setCinemaHall(CinemaHall cinemaHall) {
		this.cinemaHall = cinemaHall;
	}

    
}

