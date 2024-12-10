import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex max-w-4xl bg-orange-600 rounded-lg shadow-lg">
        {/* Left Side: Login Form */}
        <div className="w-full p-8 text-orange-500 bg-black md:w-1/2">
          <h2 className="mb-4 text-3xl font-bold">Sign In</h2>
          <div className="flex justify-center mb-6 space-x-4">
            <button className="flex items-center justify-center w-10 h-10 text-black transition bg-orange-500 rounded-full hover:bg-orange-400">
              <FaFacebookF />
            </button>
            <button className="flex items-center justify-center w-10 h-10 text-black transition bg-orange-500 rounded-full hover:bg-orange-400">
              <FaGooglePlusG />
            </button>
            <button className="flex items-center justify-center w-10 h-10 text-black transition bg-orange-500 rounded-full hover:bg-orange-400">
              <FaLinkedinIn />
            </button>
          </div>
          <p className="mb-4 text-center text-orange-400">or use your account</p>
          {errorMessage && <p className="mb-4 text-sm text-red-500">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 text-orange-500 bg-black border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 text-orange-500 bg-black border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mb-4 text-sm text-right text-orange-400 cursor-pointer hover:text-orange-500">
              Forgot your password?
            </p>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-black transition bg-orange-500 rounded-md hover:bg-orange-400"
            >
              SIGN IN
            </button>
          </form>
        </div>

        {/* Right Side: Welcome Message */}
        <div className="flex flex-col items-center justify-center w-full p-8 text-black bg-orange-500 rounded-lg md:w-1/2">
          <h2 className="text-3xl font-bold">Hello Again!</h2>
          <p className="mb-4">Enter your credentials and start your journey with us</p>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 font-bold transition border border-black rounded-md hover:bg-black hover:text-orange-500"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;