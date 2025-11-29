// src/components/admin/EditTextModal.jsx
import React, { useState } from "react";

export default function EditTextModal({ isOpen, initialText = {}, onSave, onClose }) {
  
  const [form, setForm] = useState(initialText);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Details</h2>

        {/* Title */}
        <label className="block mb-2 font-semibold">Title / Name</label>
        <input
          className="w-full p-2 mb-4 border rounded-lg"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Description */}
        <label className="block mb-2 font-semibold">Description / Tournament</label>
        <textarea
          className="w-full p-2 border rounded-lg h-28"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
        />

        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 bg-gray-400 rounded-lg" onClick={onClose}>Cancel</button>
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => onSave(form)}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
