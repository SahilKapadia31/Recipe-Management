const express = require("express");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
} = require("../controllers/recipeController");

const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // Import Multer middleware

const router = express.Router();

// Create a new recipe with image upload
router.post("/", protect, upload.single("image"), createRecipe);

// Get all recipes
router.get("/", getRecipes);

router.get("/myrecipes", protect, getUserRecipes);

// Get, update, and delete a recipe by ID
router.get("/:id", getRecipeById);
router.put("/:id", protect, upload.single("image"), updateRecipe); // Image can be updated
router.delete("/:id", protect, deleteRecipe);

module.exports = router;
