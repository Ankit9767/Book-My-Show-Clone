package com.example.BookMyShow.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BookMyShow.Domain.Show;
import com.example.BookMyShow.Repository.ShowRepository;

@Service
public class ShowService {

    @Autowired
    private ShowRepository showRepository;

    public Show createShow(Show show) {
        return showRepository.save(show);
    }

    public List<Show> getAllShows() {
        return showRepository.findAll();
    }

    public void deleteShow(Long id) {
        showRepository.deleteById(id);
    }
    
    public Show updateShow(Long showId, Show updatedShow) {
        Show existingShow = showRepository.findById(showId)
                .orElseThrow(() -> new RuntimeException("Show not found"));
        existingShow.setMovie(updatedShow.getMovie());
        existingShow.setDate(updatedShow.getDate());
        return showRepository.save(existingShow);
    }
}

