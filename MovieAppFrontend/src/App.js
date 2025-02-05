// Frontend: ReactJS with Basic Styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

const MovieApp = () => {
    const [movies, setMovies] = useState([]);
    const [formData, setFormData] = useState({ id: '', title: '', description: '' });

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/movies');
            setMovies(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //    // console.log(formData);
    //     setFormData({ ...formData, [name]: value });
    // };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: name === 'id' ? parseInt(value, 10) || '' : value // Ensure 'id' is an integer
        });
    };
    // const handleAddMovie = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:8080/api/movies', formData);
    //         setMovies([...movies, response.data]);
    //         setFormData({ id: '', title: '', description: '' });
    //     } catch (error) {
    //         console.error('Error adding movie:', error);
    //     }
    // };

    const handleAddMovie = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/movies', formData);
            setMovies([...movies, response.data]);
            setFormData({ id: '', title: '', description: '' });
        } catch (error) {
            console.error('Error adding movie:', error.response?.data || error.message);
            alert('Failed to add movie. Please check the server logs.');
        }
    };
    

    const handleUpdateMovie = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/movies/${id}`, formData);
            setMovies(movies.map((movie) => (movie.id === id ? response.data : movie)));
            setFormData({ id: '', title: '', description: '' });
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    const handleDeleteMovie = async (id) => {
        console.log(id);
        try {
            await axios.delete(`http://localhost:8080/api/movies/${id}`);
            setMovies(movies.filter((movie) => movie.id !== id));
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Movie App</h1>

            <div className="form-container">
                <input
                    type='number'
                    name="movieId"
                    placeholder="ID"
                    value={formData.movieId}
                    onChange={handleInputChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                ></textarea>
                <button onClick={handleAddMovie} className="form-button">Add Movie</button>
            </div>

            <ul className="movie-list">
                {movies.map((movie) => (
                    <li key={movie.movieId} className="movie-item">
                        <h3 className="movie-title">{movie.title}</h3>
                        <p className="movie-description">{movie.description}</p>
                        <div className="button-group">
                             <button onClick={() => handleUpdateMovie(movie.movieId)} className="update-button">Update</button>
                            <button onClick={() => handleDeleteMovie(movie.movieId)} className="delete-button">Delete</button> 
                        </div>
                    </li>
                ))}
            </ul>
            
  
        </div>
    );
};

export default MovieApp;

