import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './movieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseURL = process.env.REACT_APP_API_URL; // Get base URL from .env
    const fetchURL = `${baseURL}/movies/${id}`; // Adjusted endpoint since baseURL includes /api

    console.log("Fetch URL:", fetchURL);

    fetch(fetchURL) // Combine base URL with endpoint
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched movie data:", data);
        setMovie(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      });
  }, [id]);


  return (
    <div className="movie-detail">
      {error ? (
        <p>Error loading movie details: {error}</p>
      ) : (
        <>
          <h2>{movie.heading}</h2>
          <p>{movie.description}</p>

          <p className="thank-you-description">
            <span className="highlight">AIIISSH</span> is the best online platform for downloading Hollywood and Bollywood Movies. We provide direct G-Drive download link for fast and secure downloading. Click on the download button below and follow the steps to start download.
          </p>

          <div className="movie-detail">
            <h3>Series Info :</h3>
            <div className="info-section">
              {movie.title && <p><strong>Series Name:</strong> {movie.title}</p>}
              {movie.season && <p><strong>Season:</strong> {movie.season}</p>}
              {movie.episodes && <p><strong>Episodes:</strong> {movie.episodes}</p>}
              {movie.imdbRating && <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>}
              {movie.subtitle && <p><strong>Subtitle:</strong> {movie.subtitle}</p>}
              {movie.language && <p><strong>Language:</strong> {movie.language}</p>}
              {movie.releaseYear && <p><strong>Release Year:</strong> {movie.releaseYear}</p>}
              {movie.duration && <p><strong>Duration:</strong> {movie.duration}</p>}
              {movie.size && <p><strong>Size:</strong> {movie.size}</p>}
            </div>
          </div>

          <h3>Series-SYNOPSIS/PLOT :</h3>
          <p> {movie.moviedescription}</p>
          <h3>Screenshots: (Must See Before Downloading)… :</h3>
          <div className="screenshot-container">
            {movie.ss1 && <img src={movie.ss1} alt="Screenshot 1" />}
            {movie.ss2 && <img src={movie.ss2} alt="Screenshot 2" />}
            {movie.ss3 && <img src={movie.ss3} alt="Screenshot 3" />}
            {movie.ss4 && <img src={movie.ss4} alt="Screenshot 4" />}
            {movie.ss5 && <img src={movie.ss5} alt="Screenshot 5" />}
          </div>

          {movie.downloadLink1 && (
              <div>
                <h3>720p download link :</h3>
                <button><a href={movie.downloadLink1} >Download Link  </a></button>
              </div>
            )}

          {movie.downloadLink2 && (
              <div>
                <h3>1080p download link :</h3>
                <button><a href={movie.downloadLink2} >Download Link  </a></button>
              </div>
            )}

          {movie.downloadLink7 && (
              <div> 
                <h3>Season 1 </h3>
                <button><a href={movie.downloadLink7} >Download Link  </a></button>
            </div>
          )}
          {movie.downloadLink3 && (
              <div> 
                <h3>Season 2 </h3>
                <button><a href={movie.downloadLink3} >Download Link  </a></button>
            </div>
          )}

          {movie.downloadLink4 && (
              <div> 
                <h3>Season 3 </h3>
                <button><a href={movie.downloadLink4} >Download Link  </a></button>
            </div>
          )}

          {movie.downloadLink5 && (
              <div> 
                <h3>Season 4 </h3>
                <button><a href={movie.downloadLink5} >Download Link  </a></button>
            </div>
          )}

          {movie.downloadLink6 && (
              <div> 
                <h3>Season 5 </h3>
                <button><a href={movie.downloadLink6} >Download Link  </a></button>
            </div>
          )}

          <h3>Winding Up ❤️</h3>

          <div className="thank-you-message">
            <h3>Thank you for visiting AIIISSH, the perfect spot for HD Bollywood movies & TV series download. So please keep downloading & keep sharing. Enjoy!</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
