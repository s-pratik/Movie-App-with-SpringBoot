package com.backend.MovieApp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.MovieApp.model.Movie;
import com.backend.MovieApp.repo.MovieRepo;

@Service
public class MovieService {

    @Autowired
    MovieRepo repo ;

    public List<Movie> getMovies(){
        return repo.findAll() ;
    } 

    public Movie getMoviesById(int movieId){
        return repo.findById(movieId).orElse(new Movie());
    }

    public void addMovie(Movie movie){
        repo.save(movie);
    }

    public void updateMovie(Movie movie){
        repo.save(movie);
    }

    public void deleteMovie(int movieId){
        repo.deleteById(movieId);
    }
}
