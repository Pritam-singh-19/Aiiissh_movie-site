import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Anime.css";

const Anime = () => {
  const [bollywoodMovies, setBollywoodMovies] = useState([]); // Rename to bollywoodMovies
  const navigate = useNavigate();

  useEffect(() => {
     const baseURL = process.env.REACT_APP_API_URL;
    const endpoint = "/movies?category=Action"; // Define endpoint separately
    
    fetch(`${baseURL}${endpoint}`) // Combine base URL and endpoint
      .then((res) => res.json())
      .then((data) => setBollywoodMovies(data)) // Set bollywoodMovies state
      .catch((err) => console.error(err));
  }, []);
  

  const openMoviePage = (movie) => {
    navigate(`/movie/${movie._id}`); // Pass the movie._id to the route
  };

  return (
    <div className="anime-page">
      <div className="movies-grid">
        {bollywoodMovies && bollywoodMovies.length > 0 ? (
          bollywoodMovies.map((movie) => (
            <div
              className="movie-card"
              key={movie._id}
              onClick={() => openMoviePage(movie)} // Pass the movie object
            >
              <img src={movie.thumbnail} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          ))
        ) : (
          <p>Loading Bollywood movies...</p> // Show a loading message for Bollywood movies
        )}
      </div>
    </div>
  );
};

export default Anime;
