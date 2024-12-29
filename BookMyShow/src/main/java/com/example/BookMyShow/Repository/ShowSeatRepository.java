package com.example.BookMyShow.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.BookMyShow.Domain.Show;
import com.example.BookMyShow.Domain.ShowSeat;

@Repository
public interface ShowSeatRepository extends JpaRepository<ShowSeat, Long> {
	
	List<ShowSeat> findByShow(Show show);
	List<ShowSeat> findByShowSeatIDIn(List<Integer> showSeatIDs);
	
	void deleteByShow(Show show);
	
}

