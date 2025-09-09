const express = require("express");
const router = express.Router();
const { getDiscoveredMovies } = require("../controllers/discoverController");

// Public route
router.get("/", getDiscoveredMovies);

module.exports = router;
