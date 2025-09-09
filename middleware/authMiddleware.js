const asyncHandler = require("express-async-handler"); 
const User = require("../models/User");
const { verifyToken } = require("../utils/jwt");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const { valid, decoded, message } = verifyToken(token);

      if (!valid) {
        res.status(401);
        throw new Error(`Not authorized: ${message}`);
      }

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
