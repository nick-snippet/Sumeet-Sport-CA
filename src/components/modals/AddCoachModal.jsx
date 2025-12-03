import React, { useState } from "react";
import axios from "axios";

export default function AddCoachModal({ open, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !title || !description || !file) {
      setErr("Please fill all fields and select an image.");
      return;
    }

    setErr("");
    setLoading(true);
    try {
      const token = localStorage.getItem("ss_admin_token") || "";
      const form = new FormData();
      form.append("name", name);
      form.append("title", title);
      form.append("description", description);
      form.append("image", file);

      const headers = {
        "Content-Type": "multipart/form-data",
      };
      if (token) { headers.Authorization = 'Bearer ${token}';
      }
      const res = await axios.post("/api/coaches", form, { headers });

      setLoading(false);
      setName("");
      setTitle("");
      setDescription("");
      setFile(null);
      if (onSuccess) onSuccess(res.data);
      onClose();
    } catch (error) {
      setLoading(false);
      setErr(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error.message ||
          "Upload failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 max-w-lg w-full bg-white rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-semibold mb-3">Add New Coach</h3>
        {err && <div className="text-sm text-red-600 mb-2">{err}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Coach name"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title / role"
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description / bio"
            className="w-full px-3 py-2 border rounded"
            rows={4}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#0f2547] text-white rounded"
            >
              {loading ? "Uploading..." : "Add Coach"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}