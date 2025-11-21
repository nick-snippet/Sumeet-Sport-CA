import React from "react";

export default function Membership() {
  return (
    <div className="py-10 px-6 text-center">
      <h1 className="text-4xl font-bold text-yellow-700 mb-4">Membership</h1>
      <p className="max-w-2xl mx-auto text-gray-600 mb-8">
        Become a part of our exclusive Academy and enjoy access to Better Learning,
         Sports events, and experiences.
      </p>
      <form className="max-w-md mx-auto bg-yellow-50 p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="tel"
          placeholder="Your Phone"
          className="w-full p-2 mb-3 border rounded"
        />
        <button
          type="submit"
          className="bg-yellow-700 text-white px-6 py-2 rounded hover:bg-yellow-800"
        >
          Submit Enquiry
        </button>
      </form>
    </div>
  );
}
