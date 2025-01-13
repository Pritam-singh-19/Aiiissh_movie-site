import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Anime.css";

const Anime = () => {
  const [animeMovies, setAnimeMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/movies?category=Anime") // Filter by Bollywood category
      .then((res) => res.json())
      .then((data) => setAnimeMovies(data))
      .catch((err) => console.error(err));
  }, []);

  const openMoviePage = (movie) => {
    navigate(`/movie/${movie._id}`); // Pass the movie._id to the route
  };

  return (
    <div className="anime-page">
      <div className="movies-grid">
        {animeMovies && animeMovies.length > 0 ? (
          animeMovies.map((movie) => (
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
          <p>Loading movies...</p>
        )}
      </div>
    </div>
  );
};

export default Anime;
