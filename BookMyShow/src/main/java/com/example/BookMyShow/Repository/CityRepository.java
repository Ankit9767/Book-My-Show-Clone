package com.example.BookMyShow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.BookMyShow.Domain.City;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
}

