const express = require('express');
const router = express.Router();
const {
  getPopularMovies,
  getMovieDetails,
  searchMovieByQuery,
  getMovieVideosById,
  getSimilarMoviesById,
  getMoviesByCategoryName,
  discoverMoviesHandler
} = require('../controllers/movieController');

// Popular, search, category, discover, detail, videos, similar
router.get('/popular', getPopularMovies);
router.get('/search', searchMovieByQuery);
router.get('/category/:category', getMoviesByCategoryName);
router.get('/discover', discoverMoviesHandler);
router.get('/:id', getMovieDetails);
router.get('/:id/videos', getMovieVideosById);
router.get('/:id/similar', getSimilarMoviesById);

module.exports = router;
