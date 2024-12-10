import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api"; // Axios instance for API requests

const EditRecipe = () => {
  const { id } = useParams(); // Get recipe ID from the URL
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cuisineType: "",
    cookingTime: "",
  });
  const [image, setImage] = useState(null); // State for image file
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the recipe details by ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await api.get(`/recipes/${id}`);
        setRecipe(data);
      } catch {
        setError("Failed to load the recipe.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  // Handle form submission for updating the recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(recipe).forEach(([key, value]) => formData.append(key, value));
      if (image) formData.append("image", image); // Append image if a new image is selected

      await api.put(`/recipes/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/myfeed"); // Redirect to MyFeed after successful update
    } catch {
      setError("Failed to update the recipe.");
    }
  };

  // Handle input changes in the form
  const handleChange = (e) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected image file
  };

  if (loading) return <div className="text-orange-500">Loading...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container p-4 mx-auto text-orange-500 bg-black">
      <h1 className="mb-4 text-3xl font-bold">Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Title</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="w-full p-2 text-orange-500 bg-black border border-orange-500 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Ingredients</label>
          <input
            type="text"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            className="w-full p-2 text-orange-500 bg-black border border-orange-500 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Instructions</label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="w-full p-2 text-orange-500 bg-black border border-orange-500 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Cuisine Type</label>
          <input
            type="text"
            name="cuisineType"
            value={recipe.cuisineType}
            onChange={handleChange}
            className="w-full p-2 text-orange-500 bg-black border border-orange-500 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Cooking Time (in minutes)</label>
          <input
            type="number"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            className="w-full p-2 text-orange-500 bg-black border border-orange-500 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 text-orange-500 bg-black border border-orange-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-bold text-black bg-orange-500 rounded"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;