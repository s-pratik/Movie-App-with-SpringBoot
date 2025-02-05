package com.backend.MovieApp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.MovieApp.model.Movie;


@Repository
public interface MovieRepo extends JpaRepository<Movie , Integer> {

}
