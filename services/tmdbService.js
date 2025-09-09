const axios = require("axios");

const TMDB_API_BASE = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error("TMDB API key is missing in environment variables.");
}

/**
 * Core TMDB API fetcher with error handling
 */
const fetchFromTMDB = async (endpoint, params = {}) => {
  try {
    const url = `${TMDB_API_BASE}${endpoint}`;
    const response = await axios.get(url, {
      params: { api_key: TMDB_API_KEY, ...params },
    });

    if (response.status !== 200) {
      throw new Error(`TMDB API returned status code ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("TMDB API error:", error.message);
    throw new Error("Failed to fetch data from TMDB");
  }
};


// Popular Movies
const fetchPopularMovies = async () => await fetchFromTMDB("/movie/popular");

// Movie Details
const fetchMovieDetails = async (id) =>
  await fetchFromTMDB(`/movie/${id}`);

// Search by keyword
const searchMovies = async (query) =>
  await fetchFromTMDB("/search/movie", { query });

// Movie Videos (trailers, etc.)
const getMovieVideos = async (id) =>
  await fetchFromTMDB(`/movie/${id}/videos`);

// Similar Movies
const getSimilarMovies = async (id) =>
  await fetchFromTMDB(`/movie/${id}/similar`);

// Movies by Category (e.g. top_rated, now_playing)
const getMoviesByCategory = async (category) =>
  await fetchFromTMDB(`/movie/${category}`);

// Discover Movies with filters (genres, rating, etc.)
const discoverMovies = async (queryParams) =>
  await fetchFromTMDB("/discover/movie", queryParams);

module.exports = {
  fetchFromTMDB,
  fetchPopularMovies,
  fetchMovieDetails,
  searchMovies,
  getMovieVideos,
  getSimilarMovies,
  getMoviesByCategory,
  discoverMovies,
};

