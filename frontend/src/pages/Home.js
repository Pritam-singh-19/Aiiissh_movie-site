import React from "react";
import MovieList from "../components/MovieList";

const Home = () => {
  return (
    <div className="home">
      <h2>Trending Movies</h2>
      <MovieList />
    </div>
  );
};

export default Home;
