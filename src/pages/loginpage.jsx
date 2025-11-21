import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    // ✅ Mock admin credentials
    if (email === "admin@sports.com" && password === "admin123") {
      localStorage.setItem(
        "user",
        JSON.stringify({ email, role: "admin" })
      );
      alert("Welcome Admin!");
      navigate("/admin-dashboard");
      return;
    }

    // ✅ Normal user login
    localStorage.setItem(
      "user",
      JSON.stringify({ email, role: "user" })
    );
    alert("Login Successful!");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-green-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-green-700 font-medium hover:underline"
            >
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
