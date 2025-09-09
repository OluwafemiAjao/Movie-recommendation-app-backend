const Review = require("../models/Review");

exports.createOrUpdateReview = async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;
    const userId = req.user.id;

    if (!movieId || !rating) {
      return res.status(400).json({ message: "movieId and rating are required." });
    }

    let review = await Review.findOne({ user: userId, movieId });

    if (review) {
      review.rating = rating;
      review.comment = comment;
      await review.save();
    } else {
      review = new Review({ user: userId, movieId, rating, comment });
      await review.save();
    }

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movieId }).populate("user", "username");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found." });
    if (review.user.toString() !== userId) return res.status(403).json({ message: "Unauthorized." });

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
