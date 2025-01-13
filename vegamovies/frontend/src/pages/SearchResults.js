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
      // Fetch movies based on the search query
      fetch(`http://localhost:5000/api/movies/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch search results.");
          setLoading(false);
        });
    }
  }, [query]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div>
      <h1>Search Results for "{query}"</h1>

      {/* Show loading state */}
      {loading && <p>Loading results...</p>}

      {/* Show error if any */}
      {error && <p>{error}</p>}

      {/* Display search results */}
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
          <p>No movies found for your search.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;