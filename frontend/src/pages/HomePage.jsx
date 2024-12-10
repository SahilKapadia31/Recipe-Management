import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import api from "../api/api"; // Axios instance for API calls
import { FiSearch } from "react-icons/fi"; // Search icon from react-icons

const HomePage = () => {
  const [recipes, setRecipes] = useState([]); // State for all recipes
  const [loading, setLoading] = useState(true); // State for loading status
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Filtered recipes state

  // Fetch all recipes when the component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get("/recipes");
        setRecipes(response.data);
        setFilteredRecipes(response.data); // Set initial filtered recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  // Handle search input changes and filter recipes
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredRecipes(
      recipes.filter(
        (recipe) =>
          recipe.cuisineType.toLowerCase().includes(value) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(value)
          )
      )
    );
  };

  if (loading) {
    return <div className="text-center text-orange-500">Loading...</div>;
  }

  return (
    <div className="container min-h-screen p-6 mx-auto text-orange-500 bg-black">
      {/* Favorite Cuisines Section */}
      <h2 className="text-5xl font-bold text-center mb-7">
        What are your favorite cuisines?
      </h2>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search 2M+ Recipes"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full py-3 pl-10 pr-4 text-lg text-orange-500 bg-black border border-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <FiSearch
          className="absolute text-orange-500 transform -translate-y-1/2 left-3 top-1/2"
          size={24}
        />
      </div>

      {/* Recipes Section */}
      <h3 className="mb-4 text-xl font-semibold">Just for you</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p className="text-center">No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;