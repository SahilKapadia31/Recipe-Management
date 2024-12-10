import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password } = formData;
      await register(username, email, password);
      navigate("/"); // Redirect to home page after registration
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex max-w-4xl text-white bg-gray-900 rounded-lg shadow-lg">
        {/* Registration Form Section */}
        <div className="w-full p-8 md:w-1/2">
          <h2 className="mb-4 text-3xl font-bold text-orange-500">Sign Up</h2>
          <div className="flex justify-center mb-6 space-x-4">
            <button className="flex items-center justify-center w-10 h-10 text-orange-500 bg-gray-800 rounded-full">
              <FaFacebookF />
            </button>
            <button className="flex items-center justify-center w-10 h-10 text-orange-500 bg-gray-800 rounded-full">
              <FaGooglePlusG />
            </button>
            <button className="flex items-center justify-center w-10 h-10 text-orange-500 bg-gray-800 rounded-full">
              <FaLinkedinIn />
            </button>
          </div>
          <p className="mb-4 text-center text-gray-400">or use your email for registration</p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-2 mb-4 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-4 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-4 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button className="w-full px-4 py-2 text-black transition bg-orange-500 rounded-md hover:bg-orange-600">
              SIGN UP
            </button>
          </form>
        </div>

        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center w-full p-8 text-black bg-orange-500 rounded-lg md:w-1/2">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="mb-4 text-center">
            To stay connected with us, please log in with your personal info.
          </p>
          <button
            onClick={() => navigate("/login")} // Navigate to the login page
            className="px-4 py-2 transition border border-black rounded-md hover:bg-black hover:text-orange-500"
          >
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;