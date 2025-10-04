import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const baseURL = process.env.REACT_APP_API_URL; 
    fetch(`${baseURL}/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => setError(`Error fetching movie details: ${err.message}`));
  }, [id]);
  

  const handleEdit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // API call to update the movie
    fetch(`${baseURL}/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSuccess("Movie updated successfully!");
        navigate(`/movie/${id}`); // Redirect to movie details page
      })
      .catch((err) => setError(`Error editing movie: ${err.message}`));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  return (
    <div>
      <h2>Edit Movie</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleEdit}>
        <input
          type="text"
          name="title"
          value={movie.title || ""}
          onChange={handleInputChange}
          placeholder="Enter movie title"
        />
        <input
          type="text"
          name="heading"
          value={movie.heading || ""}
          onChange={handleInputChange}
          placeholder="Enter heading"
        />
        <input
          type="text"
          name="thumbnail"
          value={movie.thumbnail || ""}
          onChange={handleInputChange}
          placeholder="Enter thumbnail URL"
        />
        <input
          type="text"
          name="discription"
          value={movie.discription || ""}
          onChange={handleInputChange}
          placeholder="Enter  description"
        />
        <input
          type="text"
          name="moviediscription"
          value={movie.moviediscription || ""}
          onChange={handleInputChange}
          placeholder="Enter movie description"
        />
        <input
          type="text"
          name="season"
          value={movie.season || ""}
          onChange={handleInputChange}
          placeholder="Enter season"
        />
        <input
          type="text"
          name="episodes"
          value={movie.episodes || ""}
          onChange={handleInputChange}
          placeholder="Enter episodes"
        />
        <input
          type="text"
          name="imdbRating"
          value={movie.imdbRating || ""}
          onChange={handleInputChange}
          placeholder="Enter IMDB rating"
        />
        <input
          type="text"
          name="subtitle"
          value={movie.subtitle || ""}
          onChange={handleInputChange}
          placeholder="Enter subtitle"
        />
        <input
          type="text"
          name="language"
          value={movie.language || ""}
          onChange={handleInputChange}
          placeholder="Enter language"
        />
        <input
          type="text"
          name="releaseYear"
          value={movie.releaseYear || ""}
          onChange={handleInputChange}
          placeholder="Enter release year"
        />
        <input
          type="text"
          name="duration"
          value={movie.duration || ""}
          onChange={handleInputChange}
          placeholder="Enter duration"
        />
        <input
          type="text"
          name="size"
          value={movie.size || ""}
          onChange={handleInputChange}
          placeholder="Enter size"
        />
        <input
          type="text"
          name="ss1"
          value={movie.ss1 || ""}
          onChange={handleInputChange}
          placeholder="Enter screenshot 1 URL"
        />
          
        <input
        type="text"
        name="ss2"
        value={movie.ss2 || ""}
        onChange={handleInputChange}
        placeholder="Enter screenshot 2 URL"
      />
        
        <input
        type="text"
        name="ss3"
        value={movie.ss3 || ""}
        onChange={handleInputChange}
        placeholder="Enter screenshot 3 URL"
      />
      <input
        type="text"
        name="ss4"
        value={movie.ss4 || ""}
        onChange={handleInputChange}
        placeholder="Enter screenshot 4 URL"
      />
      <input
        type="text"
        name="ss5"
        value={movie.ss5 || ""}
        onChange={handleInputChange}
        placeholder="Enter screenshot 5 URL"
      />
      <input
        type="text"
        name="downloadLink1"
        value={movie.downloadLink1 || ""}
        onChange={handleInputChange}
        placeholder="Enter download link 1"
      />
      <input
        type="text"
        name="downloadLink2"
        value={movie.downloadLink2 || ""}
        onChange={handleInputChange}
        placeholder="Enter download link 2"
      />
      <input
        type="text"
        name="downloadLink7"
        value={movie.downloadLink7 || ""}
        onChange={handleInputChange}
        placeholder="season 1 link "
      />
      <input
        type="text"
        name="downloadLink3"
        value={movie.downloadLink3 || ""}
        onChange={handleInputChange}
        placeholder="season 2 link "
      />
        <input
        type="text"
        name="downloadLink4"
        value={movie.downloadLink4 || ""}
        onChange={handleInputChange}
        placeholder="season 3 link "
      />
        <input
        type="text"
        name="downloadLink5"
        value={movie.downloadLink5 || ""}
        onChange={handleInputChange}
        placeholder="season 4 link "
      />

      <input
        type="text"
        name="downloadLink6"
        value={movie.downloadLink6 || ""}
        onChange={handleInputChange}
        placeholder="season 5 link "
      />

      <button type="submit">Save Changes</button>
      </form>
      </div>
      );
      };

export default EditMovie;