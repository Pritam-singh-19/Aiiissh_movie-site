import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Anime.css";

const Anime = () => {
  const [animeMovies, setAnimeMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const baseURL = process.env.REACT_APP_API_URL;
    const endpoint = "/movies?category=Anime"; // Adjusted endpoint since baseURL includes /api

    console.log("Base URL:", baseURL);
    console.log("Fetch URL:", `${baseURL}${endpoint}`);

    fetch(`${baseURL}${endpoint}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setAnimeMovies(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      });
  }, []);

  const openMoviePage = (movie) => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <div className="anime-page">
      <div className="movies-grid">
        {error ? (
          <p>Error loading movies: {error}</p>
        ) : animeMovies && animeMovies.length > 0 ? (
          animeMovies.map((movie) => (
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
          <p>Loading movies...</p>
        )}
      </div>
    </div>
  );
};

export default Anime;
