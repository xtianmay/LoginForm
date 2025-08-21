import React, { useState } from "react";
import Dashboard from "./Dashboard";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email.";
      valid = false;
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setErrors({ email: "", password: "" });
    setIsLoggedIn(false);
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setErrors({ email: "", password: "" });
  };

  if (isLoggedIn) {
    return <Dashboard email={email} onLogout={handleLogout} />;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 overflow-x-hidden p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-sm text-white border border-white/10"
        noValidate
      >
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Login
        </h1>

        {/* Email Input */}
        <label htmlFor="email" className="block mb-1 font-medium text-gray-200">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full mb-2 p-3 rounded-lg focus:outline-none focus:ring-2 bg-gray-900/70 border ${
            errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:ring-purple-500"
          } text-white placeholder-gray-400`}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
          required
        />
        {errors.email && (
          <p id="email-error" className="text-red-400 mb-2 text-sm">
            {errors.email}
          </p>
        )}

        {/* Password Input */}
        <label
          htmlFor="password"
          className="block mb-1 font-medium text-gray-200"
        >
          Password
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="8+ characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full mb-2 p-3 rounded-lg focus:outline-none focus:ring-2 bg-gray-900/70 border ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:ring-purple-500"
          } text-white placeholder-gray-400`}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
          required
        />
        {errors.password && (
          <p id="password-error" className="text-red-400 mb-2 text-sm">
            {errors.password}
          </p>
        )}

        {/* Show Password Toggle */}
        <div className="flex items-center mb-4">
          <input
            id="show-password"
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2 accent-purple-500"
          />
          <label htmlFor="show-password" className="text-sm text-gray-300">
            Show Password
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 bg-gray-700/70 text-black py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Clear
          </button>
        </div>

        {/* Forgot Password */}
        <p className="mt-4 text-center text-sm">
          <a
            href="#"
            className="text-purple-400 hover:text-pink-400 transition-colors"
          >
            Forgot Password?
          </a>
        </p>
      </form>
    </div>
  );
}
