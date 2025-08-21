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
    <div className="h-screen w-screen flex items-center justify-center bg-black overflow-x-hidden p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-black"
        noValidate
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {/* Email Input */}
        <label htmlFor="email" className="block mb-1 font-medium">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full mb-2 p-3 border rounded focus:outline-none focus:ring-2 ${
            errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black"
          }`}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
          required
        />
        {errors.email && (
          <p id="email-error" className="text-red-600 mb-2 text-sm">
            {errors.email}
          </p>
        )}

        {/* Password Input */}
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="8+ characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full mb-2 p-3 border rounded focus:outline-none focus:ring-2 ${
            errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black"
          }`}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
          required
        />
        {errors.password && (
          <p id="password-error" className="text-red-600 mb-2 text-sm">
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
            className="mr-2"
          />
          <label htmlFor="show-password" className="text-sm">
            Show Password
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 bg-gray-200 text-black py-3 rounded hover:bg-gray-300 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Forgot Password */}
        <p className="mt-4 text-center text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </p>
      </form>
    </div>
  );
}
