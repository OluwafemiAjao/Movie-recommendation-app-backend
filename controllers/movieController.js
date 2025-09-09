const tmdbService = require("../services/tmdbService");

exports.getPopularMovies = async (req, res) => {
  try {
    const movies = await tmdbService.fetchPopularMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch popular movies." });
  }
};

exports.getMovieDetails = async (req, res) => {
  try {
    const movie = await tmdbService.fetchMovieDetails(req.params.id);
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch movie details." });
  }
};

exports.searchMovieByQuery = async (req, res) => {
  try {
    const query = req.query.q;
    const results = await tmdbService.searchMovies(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to search movies." });
  }
};

exports.getMovieVideosById = async (req, res) => {
  try {
    const videos = await tmdbService.getMovieVideos(req.params.id);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch movie videos." });
  }
};

exports.getSimilarMoviesById = async (req, res) => {
  try {
    const similar = await tmdbService.getSimilarMovies(req.params.id);
    res.json(similar);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch similar movies." });
  }
};

exports.getMoviesByCategoryName = async (req, res) => {
  try {
    const category = req.params.category;
    const movies = await tmdbService.getMoviesByCategory(category);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch category movies." });
  }
};

exports.discoverMoviesHandler = async (req, res) => {
  try {
    const queryParams = req.query;
    const movies = await tmdbService.discoverMovies(queryParams);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to discover movies." });
  }
};
