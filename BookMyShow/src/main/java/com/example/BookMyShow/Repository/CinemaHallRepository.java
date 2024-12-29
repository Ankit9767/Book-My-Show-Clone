package com.example.BookMyShow.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.BookMyShow.Domain.CinemaHall;

@Repository
public interface CinemaHallRepository extends JpaRepository<CinemaHall, Integer> {
	
	List<CinemaHall> findByCinema_CinemaID(Integer cinemaID);
	
	void deleteByCinema_CinemaID(Integer cinemaID);	
}

