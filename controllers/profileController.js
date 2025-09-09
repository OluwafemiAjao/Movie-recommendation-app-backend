const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.updateUserProfile = async (req, res) => {
//   try {
//     const updates = req.body;
//     const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found." });
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({
      message: "Profile updated successfully!",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
