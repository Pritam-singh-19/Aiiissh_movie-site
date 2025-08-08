import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResults() {
  const query = new URLSearchParams(useLocation().search).get("query");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      const baseURL = process.env.REACT_APP_API_URL; 
      const endpoint = "/movies/search?query=" + encodeURIComponent(query);

      console.log("Fetch URL:", baseURL + endpoint);

      fetch(baseURL + endpoint)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setSearchResults(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch search results.");
          setLoading(false);
          console.error("Fetch error:", err);
        });
    }
  }, [query]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div>
      <h1>Search Results for "{query}"</h1>

      {loading && <p>Loading results...</p>}

      {error && <p>{error}</p>}

      <div className="movies-grid">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <div
              className="movie-card"
              key={movie._id}
              onClick={() => handleMovieClick(movie._id)}
            >
              <img src={movie.thumbnail} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </div>
          ))
        ) : (
          !loading && <p>No movies found for your search.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
