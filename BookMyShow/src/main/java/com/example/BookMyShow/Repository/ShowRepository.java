package com.example.BookMyShow.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.BookMyShow.Domain.Show;

@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {
	
	public List<Show> findByCinemaHall_CinemaHallIDAndMovie_MovieID(Integer cinemaHallID, Long movieID);
	public List<Show> findByCinemaHall_CinemaHallID(Integer cinemaHallID);
	public List<Show> findByMovie_MovieID(Long movieID);

}

