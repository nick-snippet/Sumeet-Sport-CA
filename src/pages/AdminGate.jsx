import React, { useState } from "react";
import Upload from "./upload";

export default function AdminGate() {
  const [pass, setPass] = useState("");
  const [granted, setGranted] = useState(false);

  const adminPassword = "cricket123"; // 🔐 Backend protected

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass === adminPassword) {
      setGranted(true);
    } else {
      alert("Incorrect Password");
      window.location.href = "/";
    }
  };

  if (granted) return <Upload />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-6 rounded-xl shadow-lg w-full max-w-sm text-center border">
        <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
        <p className="mb-4 text-gray-600">Enter admin password to continue</p>

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
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}