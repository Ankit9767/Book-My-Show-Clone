package com.example.BookMyShow.Domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Cinema")
public class Cinema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cinemaID;

    private String name;
    private Integer totalCinemaHalls;

    @ManyToOne
    @JoinColumn(name = "cityID")
    private City city;

    
	public Cinema(Integer cinemaID, String name, Integer totalCinemaHalls, City city) 
	{
		
		this.cinemaID = cinemaID;
		this.name = name;
		this.totalCinemaHalls = totalCinemaHalls;
		this.city = city;
	}

	public Cinema() {
		super();
	}

	public Integer getCinemaID() {
		return cinemaID;
	}

	public void setCinemaID(Integer cinemaID) {
		this.cinemaID = cinemaID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getTotalCinemaHalls() {
		return totalCinemaHalls;
	}

	public void setTotalCinemaHalls(Integer totalCinemaHalls) {
		this.totalCinemaHalls = totalCinemaHalls;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

}

