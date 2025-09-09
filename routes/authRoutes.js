const express = require("express");
const router = express.Router();
const { register, login, changePassword } = require("../controllers/authController");
const { protect: authenticate } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", authenticate, changePassword);

module.exports = router;


