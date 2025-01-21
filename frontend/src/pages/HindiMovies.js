import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Anime.css"; // You can rename to Bollywood.css if needed

const Bollywood = () => {
  const [bollywoodMovies, setBollywoodMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Access the query parameters

 useEffect(() => {
    const baseURL = process.env.REACT_APP_API_BASE_URL; // Get base URL from .env
    const endpoint = "/api/movies?category=Bollywood"; // Define endpoint separately
    
    fetch(`${baseURL}${endpoint}`) // Combine base URL and endpoint
      .then((res) => res.json())
      .then((data) => setBollywoodMovies(data)) // Set bollywoodMovies state
      .catch((err) => console.error(err));
  }, []);

  // Extract the search query from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || ""; // Default to an empty string if no query
    const filtered = bollywoodMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [location.search, bollywoodMovies]);

  const openMoviePage = (movie) => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <div className="bollywood-page">
      <div className="movies-grid">
        {filteredMovies && filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              className="movie-card"
              key={movie._id}
              onClick={() => openMoviePage(movie)}
            >
              <img src={movie.thumbnail} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          ))
        ) : (
          <p>No Bollywood movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Bollywood;
