package com.example.BookMyShow.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BookMyShow.Domain.ShowSeat;
import com.example.BookMyShow.Domain.Enumeration.SeatStatus;
import com.example.BookMyShow.Repository.ShowSeatRepository;

@Service
public class ShowSeatService {

    @Autowired
    private ShowSeatRepository showSeatRepository;

    public ShowSeat createShowSeat(ShowSeat showSeat) {
    	showSeat.setStatus(SeatStatus.AVAILABLE);
        return showSeatRepository.save(showSeat);
    }

    public List<ShowSeat> getAllShowSeats() {
        return showSeatRepository.findAll();
    }

    public void deleteShowSeat(Long id) {
        showSeatRepository.deleteById(id);
    }
}

