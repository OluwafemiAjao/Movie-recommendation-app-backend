// const User = require("../models/User");

// exports.addToWatchlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { movieId } = req.body;

//     if (!movieId) {
//       return res.status(400).json({ message: "movieId is required." });
//     }

//     const user = await User.findById(userId);
//     if (!user.watchlist.includes(movieId)) {
//       user.watchlist.push(movieId);
//       await user.save();
//     }

//     res.status(200).json({ message: "Movie added to watchlist", watchlist: user.watchlist });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.removeFromWatchlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { movieId } = req.params;

//     const user = await User.findById(userId);
//     const initialLength = user.watchlist.length;
//     user.watchlist = user.watchlist.filter(id => id !== movieId);

//     if (user.watchlist.length !== initialLength) {
//       await user.save();
//     }

//     res.status(200).json({ message: "Movie removed from watchlist", watchlist: user.watchlist });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getWatchlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId);

//     res.status(200).json({ watchlist: user.watchlist  || "message: []" });
//     // res.status(200).json(user.watchlist || []);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };





const User = require("../models/User");

exports.getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ watchlist: user.watchlist || [] });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to fetch watchlist" });
  }
};

exports.addToWatchlist = async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) return res.status(400).json({ message: "movieId is required" });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }

    res.status(200).json({ message: "Movie added to watchlist", watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to add to watchlist" });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  const { movieId } = req.params;
  if (!movieId) return res.status(400).json({ message: "movieId is required in params" });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.watchlist = user.watchlist.filter((id) => String(id) !== String(movieId));
    await user.save();

    res.status(200).json({ message: "Movie removed from watchlist", watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to remove from watchlist" });
  }
};
