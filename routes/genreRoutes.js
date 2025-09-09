const express = require("express");
const router = express.Router();
const { getGenres } = require("../controllers/genreController");

// Public route
router.get("/", getGenres);

module.exports = router;