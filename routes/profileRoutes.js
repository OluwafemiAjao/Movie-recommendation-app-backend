const express = require("express");
const router = express.Router();
const { getUserProfile, updateUserProfile } = require("../controllers/profileController");
const { protect: authenticate } = require("../middleware/authMiddleware");

// All profile routes are protected
// Current logged-in user's profile routes
router.get("/me", authenticate, getUserProfile); // GET current logged-in user's profile
router.put("/me", authenticate, updateUserProfile); // UPDATE current logged-in user's profile

module.exports = router;
