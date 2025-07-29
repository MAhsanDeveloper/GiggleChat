import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, login] = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ username, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center px-2 mx-2.5 bg-gradient-to-t from-slate-900/60 to-transparent overflow-hidden">
      {/* Glassmorphic Container */}
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-200">
          Login <span className="text-blue-400">ChatApp</span>
        </h1>
        <form className="mt-4 sm:mt-6" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-3 sm:mb-4">
            <label
              htmlFor="username"
              className="block text-xs sm:text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="input input-bordered w-full mt-1 bg-gray-800 bg-opacity-50 text-gray-200 placeholder-gray-400 text-xs sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          {/* Password Field */}
          <div className="mb-3 sm:mb-4">
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="input input-bordered w-full mt-1 bg-gray-800 bg-opacity-50 text-gray-200 placeholder-gray-400 text-xs sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {/* Submit Button */}
          <div className="mt-5 sm:mt-6">
            <button
              type="submit"
              className="btn w-full bg-gray-800 hover:bg-gray-900 border-none text-white text-xs sm:text-sm py-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        {/* Additional Links */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-300">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;