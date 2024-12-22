package com.example.BookMyShow.Domain;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Movie")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer movieID;

    private String title;
    private String description;
    private String duration;
    private String language;
    private LocalDateTime releaseDate;
    private String country;
    private String genre;
    
	public Movie(Integer movieID, String title, String description, String duration, String language,
				LocalDateTime releaseDate, String country, String genre) 
	{
		this.movieID = movieID;
		this.title = title;
		this.description = description;
		this.duration = duration;
		this.language = language;
		this.releaseDate = releaseDate;
		this.country = country;
		this.genre = genre;
	}
	
	public Movie() {
		super();
	}
	
	
	public Integer getMovieID() {
		return movieID;
	}
	public void setMovieID(Integer movieID) {
		this.movieID = movieID;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public LocalDateTime getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(LocalDateTime releaseDate) {
		this.releaseDate = releaseDate;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}

}

