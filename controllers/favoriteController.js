// const User = require("../models/User");

// exports.getFavoriteMovieIds = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json({ favorites: user.favorites || [] });
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Failed to fetch favorite movies" });
//   }
// };

// exports.addFavorite = async (req, res) => {
//   const { movieId } = req.body;
//   if (!movieId) return res.status(400).json({ message: "movieId is required" });

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (!user.favorites.includes(movieId)) {
//       user.favorites.push(movieId);
//       await user.save();
//     }

//     res.status(200).json({ message: "Movie added to favorites", favorites: user.favorites });
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Failed to add to favorites" });
//   }
// };

// exports.removeFavorite = async (req, res) => {
//   const { movieId } = req.params;
//   if (!movieId) return res.status(400).json({ message: "movieId is required in params" });

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.favorites = user.favorites.filter((id) => String(id) !== movieId);
//     await user.save();

//     res.status(200).json({ message: "Movie removed from favorites", favorites: user.favorites });
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Failed to remove from favorites" });
//   }
// };




const User = require("../models/User");

exports.getFavoriteMovieIds = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ favorites: user.favorites || [] });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to fetch favorite movies" });
  }
};

exports.addFavorite = async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) return res.status(400).json({ message: "movieId is required" });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      await user.save();
    }

    res.status(200).json({ message: "Movie added to favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to add to favorites" });
  }
};

exports.removeFavorite = async (req, res) => {
  const { movieId } = req.params;
  if (!movieId) return res.status(400).json({ message: "movieId is required in params" });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.favorites = user.favorites.filter((id) => String(id) !== String(movieId));
    await user.save();

    res.status(200).json({ message: "Movie removed from favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to remove from favorites" });
  }
};
