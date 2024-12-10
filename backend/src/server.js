const express = require("express");
const dbConnection = require("./config/db");
const Config = require("./config");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const path = require("path");

const app = express();

const PORT = Config.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Static files
app.use("/uploads", express.static(path.resolve("uploads")));

// Database connection
dbConnection();

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Server connection error:", err);
    return;
  }
  console.log(`Server running at: http://localhost:${PORT}`);
});