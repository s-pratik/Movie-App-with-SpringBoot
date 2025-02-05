package com.backend.MovieApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.MovieApp.model.Movie;
import com.backend.MovieApp.service.MovieService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    MovieService service;

    @GetMapping("/api/movies")
    public List<Movie> getMovies() {
        return service.getMovies();
    }

    @GetMapping("api/movies/{movieId}")
    public Movie getMovieId(@PathVariable int movieId) {
        return service.getMoviesById(movieId);
    }

    @PostMapping("/api/movies")
    public void addMovie(@RequestBody Movie movie) {
        service.addMovie(movie);
    }

    @PutMapping("/api/movies")
    public void updateMovie(@RequestBody Movie movie) {
        service.updateMovie(movie);
    }

    @DeleteMapping("api/movies/{movieId}")
    public void deleteMovie(@PathVariable int movieId) {
        service.deleteMovie(movieId);
    }

}
