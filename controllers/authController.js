// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const { generateToken } = require("../utils/jwt");

// // @desc Register a new user
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check for existing user
//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     // Return token + user info
//     const token = generateToken(user._id);
//     res.status(201).json({
//       message: "User registered successfully",
//       token,
//       user: { id: user._id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Server Error" });
//   }
// };

// // @desc Login user
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = generateToken(user._id);
//     res.json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Server Error" });
//   }
// };

// // @desc Change current user's password
// exports.changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ message: "Current and new password are required." });
//     }

//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found." });

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Incorrect current password." });
  
//     const hashed = await bcrypt.hash(newPassword, 10);
//     user.password = hashed;
//     await user.save();

//     res.status(200).json({ message: "Password updated successfully." });
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Server Error" });
//   }
// };





// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const { generateToken } = require("../utils/jwt");

// // @desc Register a new user
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     console.log("📥 Register request:", { name, email }); // log input (not password!)

//     // Check for existing user
//     const existing = await User.findOne({ email });
//     if (existing) {
//       console.warn("⚠️ Registration failed: user already exists:", email);
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     // Return token + user info
//     const token = generateToken(user._id);
//     console.log("✅ User registered successfully:", user._id.toString());

//     res.status(201).json({
//       message: "User registered successfully",
//       token,
//       user: { id: user._id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     console.error("❌ Registration error:", err); // log full error
//     res.status(500).json({ error: err.message || "Server Error" });
//   }
// };

// // @desc Login user
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("📥 Login attempt:", email);

//     const user = await User.findOne({ email });
//     if (!user) {
//       console.warn("⚠️ Login failed: no user found for email:", email);
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.warn("⚠️ Login failed: wrong password for email:", email);
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken(user._id);
//     console.log("✅ Login successful:", user._id.toString());

//     res.json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     console.error("❌ Login error:", err); // log full error
//     res.status(500).json({ error: err.message || "Server Error" });
//   }
// };

// // @desc Change current user's password
// exports.changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;
//     console.log("📥 Password change attempt for user:", req.user?.id);

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ message: "Current and new password are required." });
//     }

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       console.warn("⚠️ Password change failed: user not found:", req.user?.id);
//       return res.status(404).json({ message: "User not found." });
//     }

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       console.warn("⚠️ Password change failed: incorrect current password for user:", req.user?.id);
//       return res.status(400).json({ message: "Incorrect current password." });
//     }
  
//     const hashed = await bcrypt.hash(newPassword, 10);
//     user.password = hashed;
//     await user.save();

//     console.log("✅ Password updated for user:", req.user?.id);

//     res.status(200).json({ message: "Password updated successfully." });
//   } catch (err) {
//     console.error("❌ Password change error:", err);
//     res.status(500).json({ error: err.message || "Server Error" });
//   }
// };



const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

// @desc Register a new user
const register = async (req, res) => {
  try {
    console.log("➡️ Register endpoint hit. Body:", req.body);

    const { name, email, password } = req.body;

    console.log("🔍 Checking if user already exists:", email);
    const existing = await User.findOne({ email });

    if (existing) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("🔑 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("📝 Creating new user document...");
    const user = new User({ name, email, password: hashedPassword });

    console.log("💾 Saving new user...");
    await user.save();

    console.log("✅ User saved. Generating token...");
    const token = generateToken(user._id);

    console.log("🎉 Registration successful:", user._id.toString());
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("❌ Error in register:", err);
    res.status(500).json({ error: err.message || "Server Error" });
  }
};

// @desc Login user
const login = async (req, res) => {
  try {
    console.log("➡️ Login endpoint hit. Body:", req.body);

    const { email, password } = req.body;

    console.log("🔍 Looking for user:", email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ No user found with email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("🔑 Comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Password mismatch for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Password match. Generating token...");
    const token = generateToken(user._id);

    console.log("🎉 Login successful:", user._id.toString());
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("❌ Error in login:", err);
    res.status(500).json({ error: err.message || "Server Error" });
  }
};

// @desc Change current user's password
const changePassword = async (req, res) => {
  try {
    console.log("➡️ Change password endpoint hit. User ID:", req.user?.id);

    const { currentPassword, newPassword } = req.body;
    console.log("📩 Payload received:", { currentPassword, newPassword });

    if (!currentPassword || !newPassword) {
      console.log("⚠️ Missing fields in change password request");
      return res.status(400).json({ message: "Current and new password are required." });
    }

    console.log("🔍 Fetching user from DB...");
    const user = await User.findById(req.user.id);

    if (!user) {
      console.log("❌ User not found in DB:", req.user.id);
      return res.status(404).json({ message: "User not found." });
    }

    console.log("🔑 Verifying current password...");
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      console.log("❌ Incorrect current password for user:", req.user.id);
      return res.status(400).json({ message: "Incorrect current password." });
    }

    console.log("🔑 Hashing new password...");
    const hashed = await bcrypt.hash(newPassword, 10);

    console.log("💾 Updating password...");
    user.password = hashed;
    await user.save();

    console.log("🎉 Password updated successfully for user:", req.user.id);
    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("❌ Error in changePassword:", err);
    res.status(500).json({ error: err.message || "Server Error" });
  }
};

module.exports = {
  register,
  login,
  changePassword
};

