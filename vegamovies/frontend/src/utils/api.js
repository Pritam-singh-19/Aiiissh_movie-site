export const getMovies = async () => {
    try {
      const response = await fetch("https://api.example.com/movies");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };
  