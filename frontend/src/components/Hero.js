import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Hero.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Hero() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Track search input
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // Redirect to search page with query
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="hero">
      {/* Video Background */}
      <video className="background-video" autoPlay loop muted>
        <source src="/3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <img src="/Aiiissh.png" alt="logo" className="Aiiissh" />
        </div>
        <nav className="nav">
          <button className="dropdown-button" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <Link to="/">Home</Link>
              <Link to="/hindi-movies">Hindi Movies</Link>
              <Link to="/hindi-web-series">Hindi Web Series</Link>
              <Link to="/action">Action</Link>
              <Link to="/adventure">Adventure</Link>
              <Link to="/horror">Horror</Link>
              <Link to="/anime">Anime</Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Content */}
      <div className="Hero-heading">
      <h1>Find your interest here</h1>
      <p>Your one-stop destination for movies and web series.</p>
      </div>
      <div className="hero-content"></div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie or series..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="categories">
        <Link to="/anime">
          <button className="category-button">Anime</button>
        </Link>
        <Link to="/hindi-movies">
          <button className="category-button">Hindi Movies</button>
        </Link>
        <Link to="/hindi-web-series">
          <button className="category-button">Hindi Web-Series</button>
        </Link>
        <Link to="/action">
          <button className="category-button">Action</button>
        </Link>
        <Link to="/adventure">
          <button className="category-button">Adventure</button>
        </Link>
        <Link to="/horror">
          <button className="category-button">Horror</button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
