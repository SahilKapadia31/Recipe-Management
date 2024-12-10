const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found, authorization failed" });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token, authorization failed" });
    }
  }

  return res.status(401).json({ message: "No token provided, please log in to continue" });
};

module.exports = { protect };