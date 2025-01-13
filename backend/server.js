const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://pritamsing1906:Pritam1903@cluster0.z5rhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Movie schema and model
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  heading: { type: String, required: true },
  thumbnail: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  season: { type: String },
  episodes: { type: String },
  imdbRating: { type: String },
  subtitle: { type: String },
  language: { type: String },
  releaseYear: { type: String },
  duration: { type: String },
  size: { type: String },
  moviedescription: { type: String, required: true },
  ss1: { type: String },
  ss2: { type: String },
  ss3: { type: String },
  ss4: { type: String },
  ss5: { type: String },
  downloadLink1: { type: String },
  downloadLink2: { type: String },
  downloadLink3: { type: String },
  downloadLink4: { type: String },
  downloadLink5: { type: String },
  downloadLink6: { type: String },
  downloadLink7: { type: String },
});

const Movie = mongoose.model("Movie", movieSchema);

// API endpoints
app.get('/api/movies/search', (req, res) => {
  const query = req.query.query;
  Movie.find({ title: { $regex: query, $options: 'i' } })
    .then(movies => res.json(movies))
    .catch(err => res.status(400).send('Error fetching movies'));
});

// Get all movies
app.get("/api/movies", async (req, res) => {
  const { category } = req.query;
  try {
    const movies = category
      ? await Movie.find({ category })
      : await Movie.find(); // Return all movies if no category is provided
    res.json(movies);
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get movie by ID
app.get("/api/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    console.error("Error fetching movie:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add new movie
app.post("/api/movies", async (req, res) => {
  const { title, heading, thumbnail, category, description, season="", episodes="", imdbRating, subtitle="", language, releaseYear="", duration="", size="", moviedescription, ss1, ss2, ss3, ss4="", ss5="", downloadLink1, downloadLink2="",downloadLink3="",downloadLink4="",downloadLink5="",downloadLink6="",downloadLink7=""} = req.body;

  // Add validation for required fields
  if (!title || !category || !description || !thumbnail || !moviedescription) {
    return res.status(400).json({ message: "Title, category, description, thumbnail, and movie description are required" });
  }

  try {
    const newMovie = new Movie({
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
    });
    await newMovie.save();
    res.json({ message: "Movie added successfully", movie: newMovie });
  } catch (err) {
    console.error("Error saving movie:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update movie
app.put("/api/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true });
    if (!updatedMovie) {    return res.status(404).json({ message: "Movie not found" });
  }
  res.json({ message: "Movie updated successfully", movie: updatedMovie });
} catch (err) {
  console.error("Error updating movie:", err);
  res.status(500).json({ message: "Server error" });
}
});

// Delete movie
app.delete("/api/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    await Movie.findByIdAndDelete(movieId);
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error("Error deleting movie:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));