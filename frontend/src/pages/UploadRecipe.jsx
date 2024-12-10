import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // Axios instance for API calls

const UploadRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cuisineType: "",
    cookingTime: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "ingredients") {
          data.append(key, value.split(",").map((item) => item.trim()));
        } else {
          data.append(key, value);
        }
      });

      if (image) {
        data.append("image", image);
      }

      await api.post("/recipes", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (error) {
      setError("Error creating recipe");
    }
  };

  return (
    <div className="container min-h-screen p-4 mx-auto text-orange-500 bg-black">
      <h1 className="mb-6 text-3xl font-bold">Upload Recipe</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-orange-400">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 text-orange-500 bg-black border border-orange-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-orange-400">Ingredients (comma-separated)</label>
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full px-4 py-2 text-orange-500 bg-black border border-orange-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-orange-400">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full px-4 py-2 text-orange-500 bg-black border border-orange-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-orange-400">Cuisine Type</label>
          <input
            type="text"
            name="cuisineType"
            value={formData.cuisineType}
            onChange={handleChange}
            className="w-full px-4 py-2 text-orange-500 bg-black border border-orange-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-orange-400">Cooking Time (minutes)</label>
          <input
            type="number"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleChange}
            className="w-full px-4 py-2 text-orange-500 bg-black border border-orange-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-orange-400">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 text-orange-500 bg-black border border-orange-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-bold text-black bg-orange-500 rounded hover:bg-orange-600"
        >
          Upload Recipe
        </button>
      </form>
    </div>
  );
};

export default UploadRecipe;