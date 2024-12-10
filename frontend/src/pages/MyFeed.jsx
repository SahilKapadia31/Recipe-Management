import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api, { BASE_URL } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const MyFeed = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await api.get("/recipes/myrecipes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching user's recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/recipes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleEdit = (id) => navigate(`/edit-recipe/${id}`);

  if (loading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="container min-h-screen p-4 mx-auto text-orange-400 bg-black">
      <h1 className="mb-6 text-3xl font-bold text-center">My Recipes</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="p-4 mb-4 text-orange-400 bg-gray-800 rounded-lg shadow-md"
            >
              {recipe.imageUrl && (
                <img
                  src={`${BASE_URL}${recipe.imageUrl}`}
                  alt={recipe.title}
                  className="object-cover w-full h-48 mb-4 rounded-t-md"
                />
              )}

              <h2 className="mb-2 text-xl font-bold">{recipe.title}</h2>
              <p className="text-gray-300">
                <strong>Cuisine Type:</strong> {recipe.cuisineType}
              </p>
              <p className="text-gray-300">
                <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
              </p>
              <p className="text-gray-300">
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p className="text-gray-300">
                <strong>Instructions:</strong> {recipe.instructions}
              </p>

              <div className="mt-4">
                <button
                  onClick={() => handleEdit(recipe._id)}
                  className="px-4 py-2 mr-2 text-black bg-orange-500 rounded hover:bg-orange-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="px-4 py-2 text-black bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No recipes found in your feed.</p>
        )}
      </div>
    </div>
  );
};

export default MyFeed;