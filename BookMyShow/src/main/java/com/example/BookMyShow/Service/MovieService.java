package com.example.BookMyShow.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BookMyShow.Domain.Movie;
import com.example.BookMyShow.Domain.Show;
import com.example.BookMyShow.Repository.MovieRepository;
import com.example.BookMyShow.Repository.ShowRepository;
import com.example.BookMyShow.Repository.ShowSeatRepository;

import jakarta.transaction.Transactional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;
    
    @Autowired 
    private ShowRepository showRepository ;
    
    @Autowired
    private ShowSeatRepository showSeatRepository ;

    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @Transactional
    public void deleteMovie(Long id) {
        List<Show> shows = showRepository.findByMovie_MovieID(id);

        if (!shows.isEmpty()) {
            for (Show show : shows) {
                showSeatRepository.deleteByShow(show);
            }
            
            showRepository.deleteAll(shows);
        }

        movieRepository.deleteById(id);
    }


    
    public Movie getMovieById(Long id) {
        Optional<Movie> movie = movieRepository.findById(id);
        return movie.orElseThrow(() -> new RuntimeException("Movie not found with id " + id));
    }
    
    public Movie updateMovie(Long id, Movie movie) {
        Movie existingMovie = movieRepository.findById(id)
                                             .orElseThrow(() -> new RuntimeException("Movie not found with id " + id));
        existingMovie.setTitle(movie.getTitle());
        existingMovie.setDescription(movie.getDescription());
        existingMovie.setDuration(movie.getDuration());
        existingMovie.setLanguage(movie.getLanguage());
        existingMovie.setReleaseDate(movie.getReleaseDate());
        existingMovie.setCountry(movie.getCountry());
        existingMovie.setGenre(movie.getGenre());
        return movieRepository.save(existingMovie);
    }

}

