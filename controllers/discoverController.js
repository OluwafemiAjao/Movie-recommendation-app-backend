const { discoverMovies } = require("../services/tmdbService");

exports.getDiscoveredMovies = async (req, res) => {
  try {
    const { sort_by, with_genres, primary_release_year, vote_average_gte } = req.query;

    const filters = {
      ...(sort_by && { sort_by }),
      ...(with_genres && { with_genres }),
      ...(primary_release_year && { primary_release_year }),
      ...(vote_average_gte && { "vote_average.gte": vote_average_gte }),
    };

    const movies = await discoverMovies(filters);
    res.json(movies);
  } catch (error) {
    console.error("Error in Discover Controller:", error.message);
    res.status(500).json({ message: "Failed to fetch discovered movies." });
  }
};

