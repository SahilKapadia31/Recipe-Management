import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api, { BASE_URL } from "../api/api";

const RecipeDetails = () => {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await api.get(`/recipes/${id}`); // Fetch recipe by ID
        setRecipe(response.data);
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setError("Failed to load recipe. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-orange-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-orange-500">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center text-orange-500">Recipe not found</div>;
  }

  return (
    <div className="container min-h-screen p-4 mx-auto text-orange-300 bg-black">
      {/* Render the image if available */}
      {recipe.imageUrl && (
        <img
          src={`${BASE_URL}${recipe.imageUrl}`}
          alt={recipe.title}
          className="object-cover w-full h-64 mb-4 border border-orange-500 rounded-lg"
        />
      )}
      <h1 className="mb-4 text-4xl font-bold text-orange-400">{recipe.title}</h1>
      <p>
        <strong className="text-orange-500">Cuisine Type:</strong> {recipe.cuisineType}
      </p>
      <p>
        <strong className="text-orange-500">Cooking Time:</strong> {recipe.cookingTime} minutes
      </p>
      <p>
        <strong className="text-orange-500">Ingredients:</strong>
      </p>
      <ul className="mb-4 ml-5 list-disc">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-orange-300">
            {ingredient}
          </li>
        ))}
      </ul>
      <p>
        <strong className="text-orange-500">Instructions:</strong>
      </p>
      <p className="text-orange-300">{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;