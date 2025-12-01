import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminGate() {
  const [pass, setPass] = useState("");
  const { loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  const correctPassword = "cricket123";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pass === correctPassword) {
      loginAsAdmin();         // 🔥 set global admin role
      navigate("/");          // 🔥 redirect to homepage
    } else {
      alert("Incorrect Password");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-6 rounded-xl shadow-lg w-full max-w-sm text-center border">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <p className="mb-4 text-gray-600">Enter admin password</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-2 border rounded-md mb-4"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Unlock Admin Mode
          </button>
        </form>
      </div>
    </div>
  );
}
