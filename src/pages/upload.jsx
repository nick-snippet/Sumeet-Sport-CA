import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    // Mock upload simulation
    setTimeout(() => {
      setMessage(`✅ "${file.name}" uploaded successfully!`);
      setFile(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-br from-green-50 to-white px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-green-200">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Upload Images / Event Updates
        </h2>

        <form onSubmit={handleUpload} className="space-y-5">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Upload
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-700 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Upload;
