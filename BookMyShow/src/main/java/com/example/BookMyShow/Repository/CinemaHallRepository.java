package com.example.BookMyShow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.BookMyShow.Domain.CinemaHall;

@Repository
public interface CinemaHallRepository extends JpaRepository<CinemaHall, Integer> {
}

