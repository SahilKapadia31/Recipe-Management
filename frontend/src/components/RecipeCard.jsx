import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRightCircle } from "react-icons/fi"; // Icon for "Get more details"
import { BASE_URL } from "../api/api"; // Import BASE_URL

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe._id}`}>
      <div className="relative p-4 mb-4 transition-transform transform bg-yellow-100 rounded-lg shadow-lg cursor-pointer hover:bg-orange-100 hover:-translate-y-1 hover:shadow-xl">
        {/* Recipe Image */}
        {recipe.imageUrl && (
          <img
            src={`${BASE_URL}${recipe.imageUrl}`}
            alt={recipe.title}
            className="object-cover w-full h-48 mb-4 rounded-t-md"
          />
        )}

        {/* Recipe Title */}
        <h2 className="mb-2 text-2xl font-bold text-orange-400 truncate">
          {recipe.title}
        </h2>

        {/* Recipe Instructions */}
        <p className="mb-4 text-gray-700 truncate">
          {recipe.instructions}
        </p>

        {/* "Click to Know More" Button */}
        <div className="absolute flex items-center space-x-2 text-orange-400 bottom-2 right-2 hover:text-white">
          <span>Click to Know More</span>
          <FiArrowRightCircle size={20} />
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;