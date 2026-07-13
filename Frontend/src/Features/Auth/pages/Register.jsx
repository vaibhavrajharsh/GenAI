import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-gray-900 to-black px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Create Account</h1>
          <p className="text-gray-300 mt-2">set up your account</p>
        </div>

        {/* Username */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Username
          </label>
          <input
            type="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter Username"
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-400 outline-none transition duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
          />
        </div>
        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
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

        {/* Login Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-3 rounded-xl bg-amber-400 py-3 font-semibold text-gray-900 transition duration-300 hover:bg-amber-300 active:scale-[0.98]"
        >
          Sign Up
        </button>
        {/* Signup */}
        <p className="mt-6 text-center text-gray-400">
          already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-amber-400 hover:text-amber-300"
          >
            {loading ? "Loading" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
