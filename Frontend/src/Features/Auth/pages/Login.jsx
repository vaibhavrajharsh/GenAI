import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";


const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate('/')
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-gray-900 to-black px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-300 mt-2">
            Sign in to continue to your account
          </p>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-400 outline-none transition duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your password"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-400 outline-none transition duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-6">
          <button className="text-sm text-amber-400 hover:text-amber-300 transition">
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-amber-400 py-3 font-semibold text-gray-900 transition duration-300 hover:bg-amber-300 active:scale-[0.98]"
        >
          {loading ? "Loading" : "Log In"}
        </button>

        {/* Signup */}
        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-amber-400 hover:text-amber-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
