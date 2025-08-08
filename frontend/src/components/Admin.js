import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from './useAuth';

function Admin() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [season, setSeason] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [language, setLanguage] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [duration, setDuration] = useState("");
  const [size, setSize] = useState("");
  const [moviedescription, setMoviedescription] = useState("");
  const [ss1, setSs1] = useState("");
  const [ss2, setSs2] = useState("");
  const [ss3, setSs3] = useState("");
  const [ss4, setSs4] = useState("");
  const [ss5, setSs5] = useState("");
  const [downloadLink1, setDownloadLink1] = useState("");
  const [downloadLink2, setDownloadLink2] = useState("");
  const [downloadLink3, setDownloadLink3] = useState("");
  const [downloadLink4, setDownloadLink4] = useState("");
  const [downloadLink5, setDownloadLink5] = useState("");
  const [downloadLink6, setDownloadLink6] = useState("");
  const [downloadLink7, setDownloadLink7] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  
  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem('isLoggedIn')) {
      navigate('/login');
    } else {
      const baseURL = process.env.REACT_APP_API_URL; // Get base URL from .env
      // Adjusted fetch URL to avoid duplicated 'api' in the path
      // Assuming REACT_APP_API_URL includes '/api' already
      fetch(`${baseURL}/movies`)
        .then((res) => res.json())
        .then((data) => setMovies(data))
        .catch((err) => console.error(err));
    }
  }, [isAuthenticated, navigate]);
  

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !heading || !thumbnail || !category || !description || !moviedescription) {
      setError("Please fill in all required fields.");
      return;
    }

    const newMovie = {
      title,
      heading,
      thumbnail,
      category,
      description,
      season,
      episodes,
      imdbRating,
      subtitle,
      language,
      releaseYear,
      duration,
      size,
      moviedescription,
      ss1,
      ss2,
      ss3,
      ss4,
      ss5,
      downloadLink1,
      downloadLink2,
      downloadLink3,
      downloadLink4,
      downloadLink5,
      downloadLink6,
      downloadLink7,
    };

    fetch("http://localhost:5000/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        setSuccess(data.message);
        setMovies([...movies, data.movie]);
        setTitle("");
        setHeading("");
        setThumbnail("");
        setCategory("");
        setDescription("");
        setSeason("");
        setEpisodes("");
        setImdbRating("");
        setSubtitle("");
        setLanguage("");
        setReleaseYear("");
        setDuration("");
        setSize("");
        setMoviedescription("");
        setSs1("");
        setSs2("");
        setSs3("");
        setSs4("");
        setSs5("");
        setDownloadLink1("");
        setDownloadLink2("");
        setDownloadLink3("");
        setDownloadLink4("");
        setDownloadLink5("");
        setDownloadLink6("");
        setDownloadLink7("");
      })
      .catch((err) => {
        setError("Error adding movie: " + err.message);
        console.error(err);
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-movie/${id}`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/movies/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setMovies(movies.filter((movie) => movie._id !== id));
      })
      .catch((err) => {
        setError("Error deleting movie: " + err.message);
        console.error(err);
      });
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <form onSubmit={handleSearch}>
        <input
                type="text"
                placeholder="Search for a movie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.length > 0 ? (
                  filteredMovies.map((movie) => (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.category}</td>
                      <td>
                        <button onClick={() => handleEdit(movie._id)}>Edit</button>
                        <button onClick={() => handleDelete(movie._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No movies found.</td>
                  </tr>
                )}
              </tbody>
            </table>
        
            <h2>Add New Movie</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleAddMovie}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Thumbnail URL"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Horror">Horror</option>
                <option value="Anime">Anime</option>
                <option value="Bollywood">Hindi Movies</option>
                <option value="Hindi-Web-Series">Hindi Web Series</option>
              </select>
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Movie Description"
                value={moviedescription}
                onChange={(e) => setMoviedescription(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="IMDB Rating"
                value={imdbRating}
                onChange={(e) => setImdbRating(e.target.value)}
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
              <input
                type="text"
                placeholder="Release Year"
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
              />
              <input
                type="text"
                placeholder="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <input
                type="text"
                placeholder="Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
              <input
                type="text"
                placeholder="Season"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              />
              <input
                type="text"
                placeholder="Episodes"
                value={episodes}
                onChange={(e) => setEpisodes(e.target.value)}
              />
              <input
                type="text"
                placeholder="Screenshot 1 URL"
                value={ss1}
                onChange={(e) => setSs1(e.target.value)}
                
              />
              <input
                type="text"
                placeholder="Screenshot 2 URL"
                value={ss2}
                onChange={(e) => setSs2(e.target.value)}
                
              />
              <input
                type="text"
                placeholder="Screenshot 3 URL"
                value={ss3}
                onChange={(e) => setSs3(e.target.value)}
                
              />
              <input
                type="text"
                placeholder="Screenshot 4 URL"
                value={ss4}
                onChange={(e) =>  setSs4(e.target.value)}
                
                        />
                <input
                type="text"
                placeholder="Screenshot 5 URL"
                value={ss5}
                onChange={(e) => setSs5(e.target.value)}
                
              />
              <input
                type="text"
                placeholder="Download Link 1"
                value={downloadLink1}
                onChange={(e) => setDownloadLink1(e.target.value)}
                
              />
              <input
                type="text"
                placeholder="Download Link 2"
                value={downloadLink2}
                onChange={(e) => setDownloadLink2(e.target.value)}
              />
              <input
                type="text"
                placeholder="season 1 link"
                value={downloadLink7}
                onChange={(e) => setDownloadLink7(e.target.value)}
              />
              <input
                type="text"
                placeholder="season 2 link"
                value={downloadLink3}
                onChange={(e) => setDownloadLink3(e.target.value)}
              />
              <input
                type="text"
                placeholder="season 3 link"
                value={downloadLink4}
                onChange={(e) => setDownloadLink4(e.target.value)}
              />
              <input
                type="text"
                placeholder="season 4 link"
                value={downloadLink5}
                onChange={(e) => setDownloadLink5(e.target.value)}
              />
              <input
                type="text"
                placeholder="season 5 link"
                value={downloadLink6}
                onChange={(e) => setDownloadLink6(e.target.value)}
              />


          <button type="submit">Add Movie</button>
        </form>
      </div>
      );
      }

export default Admin;