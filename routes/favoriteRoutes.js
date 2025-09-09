const express = require("express");
const router = express.Router();
const { addFavorite, removeFavorite, getFavoriteMovieIds } = require("../controllers/favoriteController");
const { protect: authenticate } = require("../middleware/authMiddleware");

// All routes are protected
router.post("/", authenticate, addFavorite);
router.delete("/:movieId", authenticate, removeFavorite);
router.get("/", authenticate, getFavoriteMovieIds);

module.exports = router;