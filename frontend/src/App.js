import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import AlertBanner from "./components/AlertBanner";
import Footer from "./components/Footer";
import AnimePage from "./pages/Anime"; 
import HindiMoviesPage from "./pages/HindiMovies"; 
import HindiWebSeriesPage from "./pages/HindiWebSeries"; 
import ActionMoviesPage from "./pages/ActionMovies"; 
import AdventureMoviesPage from "./pages/AdventureMovies"; 
import HorrorMoviesPage from "./pages/HorrorMovies"; 
import MovieDetail from "./pages/MovieDetails"; 
import Login from './components/Login';
import AdminPage from "./components/Admin"; 
import SearchResults from "./pages/SearchResults"; // Added for search functionality
import EditMovie from "./components/EditMovie";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header and Hero Section */}
        <Hero />
        <AlertBanner />
        
        {/* Main Routes */}
        <Routes>

          {/* login Page */}
          <Route path="/login" element={<Login />} /> 
          {/* Admin Page */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Home Page */}
          <Route path="/" element={<AnimePage />} />

          {/* Individual Movie Categories */}
          <Route path="/hindi-movies" element={<HindiMoviesPage />} />
          <Route path="/hindi-web-series" element={<HindiWebSeriesPage />} />
          <Route path="/action" element={<ActionMoviesPage />} />
          <Route path="/adventure" element={<AdventureMoviesPage />} />
          <Route path="/horror" element={<HorrorMoviesPage />} />
          <Route path="/anime" element={<AnimePage />} />

          {/* Movie Details Page */}
          <Route path="/movie/:id" element={<MovieDetail />} />
          
          {/* Edit Movie Page */}
          <Route path="/edit-movie/:id" element={<EditMovie />} />

          {/* Search Results Page */}
          <Route path="/search" element={<SearchResults />} />
        </Routes>

        {/* Footer Section */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
