const express = require("express");
const router = express.Router();
const { createOrUpdateReview, getReviewsByMovie, deleteReview } = require("../controllers/reviewController");
const { protect: authenticate } = require("../middleware/authMiddleware");

// Public route
router.get("/:movieId", getReviewsByMovie);

// Protected routes
router.post("/", authenticate, createOrUpdateReview);
router.delete("/:reviewId", authenticate, deleteReview);

module.exports = router;