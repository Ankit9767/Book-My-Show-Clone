package com.example.BookMyShow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.BookMyShow.Domain.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
}

