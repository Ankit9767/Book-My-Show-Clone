package com.example.BookMyShow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.BookMyShow.Domain.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
}

