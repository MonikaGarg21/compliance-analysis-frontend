import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const response = await api.post("/auth/signup", formData);
        console.log(response.data);
        alert("Register Successfully !!");
        setIsSignup(false);
      } else {
        const response = await api.post("/auth/signin", formData);
        console.log(response.data);
        alert("Login Successfully !!");
        navigate("");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong!";
      alert(message);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-black">
      <div className="max-w-md w-full bg-blue-400/30 dark:bg-blue-400/20 backdrop-blur-md shadow-xl rounded-xl p-6">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#115eab] mb-5 text-center">
          {isSignup ? "Create Account" : "Login"}
        </h1>

        {/* Form */}
        <form className="space-y-3" onSubmit={submitHandler}>
          {/* Username (Signup only) */}
          {isSignup && (
            <input
              name="userName"
              type="text"
              onChange={handleChange}
              value={formData.userName}
              placeholder="Username"
              className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-black/30 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4E94DA]"
            />
          )}

          {/* Email */}
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-black/30 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4E94DA]"
          />

          {/* Password Field */}
          <div className="relative">
            <input
              name="password"
              onChange={handleChange}
              value={formData.password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2.5 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-black/30 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4E94DA]"
            />

            {/* Toggle Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-10-7a9.77 9.77 0 012.563-3.844M6.223 6.223A9.956 9.956 0 0112 5c5 0 9 4 10 7a9.97 9.97 0 01-4.293 5.096M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L3 3"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7 0s-4-7-10-7-10 7-10 7 4 7 10 7 10-7 10-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#4E94DA] hover:bg-[#3b7fc4] text-white font-semibold py-2.5 rounded-lg transition"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Bottom Toggle */}
        <p className="mt-5 text-sm text-center text-black dark:text-white">
          {isSignup ? "Already have an account?" : "Don't have an account?"}

          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="inline-flex items-center text-[#4E94DA] hover:underline ml-1"
          >
            {isSignup ? "Login" : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
