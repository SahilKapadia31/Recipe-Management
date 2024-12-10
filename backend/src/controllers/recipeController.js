const Recipe = require("../models/recipeModel");

// Create Recipe with Image Upload
const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, cuisineType, cookingTime } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cuisineType,
      cookingTime,
      imageUrl,
      author: req.user.id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: "Error creating recipe", error: error.message });
  }
};

// Update Recipe with Image Upload
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { title, ingredients, instructions, cuisineType, cookingTime } = req.body;

    Object.assign(recipe, {
      title: title || recipe.title,
      ingredients: ingredients || recipe.ingredients,
      instructions: instructions || recipe.instructions,
      cuisineType: cuisineType || recipe.cuisineType,
      cookingTime: cookingTime || recipe.cookingTime,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : recipe.imageUrl,
    });

    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error: error.message });
  }
};

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipes", error: error.message });
  }
};

// Get recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipe", error: error.message });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await Recipe.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error: error.message });
  }
};

// Get recipes by the logged-in user
const getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.user.id });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user's recipes", error: error.message });
  }
};

module.exports = {
  createRecipe,
  updateRecipe,
  getRecipes,
  getRecipeById,
  deleteRecipe,
  getUserRecipes,
};