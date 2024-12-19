package com.example.BookMyShow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.BookMyShow.Domain.CinemaSeat;

@Repository
public interface CinemaSeatRepository extends JpaRepository<CinemaSeat, Long> {
}

