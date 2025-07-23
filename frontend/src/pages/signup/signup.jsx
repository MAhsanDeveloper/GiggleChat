import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const  [inputs, setInputs] = useState({
    fullName : '',
    username : '',
    password : '',
    confirmPassword : '',
    gender : '',
  });

  const handleCheckboxChange = (gender) => {
    setInputs({...inputs, gender});
  }

  const [loading, signup] = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs); //signup function is the useSignup.js hook
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
      {/* Glassmorphic Container */}
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-center text-gray-200">
          Signup <span className="text-blue-400">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Full Name Field */}
          <div className="mb-3">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              className="input input-bordered w-full mt-1 bg-gray-800 bg-opacity-50 text-gray-200 placeholder-gray-400 text-sm"
              value={inputs.fullName}
              onChange={(e) => setInputs({...inputs, fullName : e.target.value})}
            />
          </div>
          {/* Username Field */}
          <div className="mb-3">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="input input-bordered w-full mt-1 bg-gray-800 bg-opacity-50 text-gray-200 placeholder-gray-400 text-sm"
              value={inputs.username}
              onChange={(e)=> setInputs({...inputs, username : e.target.value})}
            />
          </div>
          {/* Password Field */}
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="input input-bordered w-full mt-1 bg-gray-800 bg-opacity-50 text-gray-200 placeholder-gray-400 text-sm"
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password : e.target.value})}
            />
          </div>
          {/* Confirm Password Field */}
          <div className="mb-3">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              className="input input-bordered w-full mt-1 bg-gray-800 bg-opacity-50 text-gray-200 placeholder-gray-400 text-sm"
              value={inputs.confirmPassword}
              onChange={(e)=> setInputs({...inputs, confirmPassword : e.target.value})}
            />
          </div>
          {/* Gender Field */}
          <div className="mb-3">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-300"
            >
              Gender
            </label>
            <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>
          </div>

          {/* Submit Button */}
          <div className="mt-5">
            <button
              type="submit"
              className="btn w-full bg-gray-800 hover:bg-gray-900 border-none text-white text-sm py-2"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Sign up"}
            </button>
          </div>
        </form>
        {/* Additional Links */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
