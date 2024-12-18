package com.example.BookMyShow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BookMyShow.Domain.Cinema;

public interface CinemaRepository extends JpaRepository<Cinema, Long> {
	
}

