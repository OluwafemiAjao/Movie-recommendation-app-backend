const express = require("express");
const router = express.Router();
const { addToWatchlist, removeFromWatchlist, getWatchlist } = require("../controllers/watchlistController");
const { protect: authenticate } = require("../middleware/authMiddleware");

// All routes are protected
router.post("/", authenticate, addToWatchlist);
router.delete("/:movieId", authenticate, removeFromWatchlist);
router.get("/", authenticate, getWatchlist);

module.exports = router;