const { fetchFromTMDB } = require("../services/tmdbService");

const getGenres = async (req, res) => {
  try {
    const data = await fetchFromTMDB("/genre/movie/list");
    res.json(data.genres); // TMDB wraps it under `genres` key
  } catch (error) {
    console.error("Error fetching genres:", err.message);
    res.status(500).json({ message: "Failed to fetch genres" });
  }
};

module.exports = {
  getGenres,
};