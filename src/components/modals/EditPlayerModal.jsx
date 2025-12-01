// src/components/modals/EditPlayerModal.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function EditPlayerModal({ open, player = {}, onClose, onSuccess }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", tournament: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({ name: player.name || "", tournament: player.tournament || "" });
    setFile(null);
    setLoading(false);
  }, [player, open]);

  if (!open) return null;

  const getToken = async () => {
    if (!user) throw new Error("Not authenticated");
    return await user.getIdToken();
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("tournament", form.tournament);
      if (file) fd.append("image", file);

      const res = await fetch(`/api/players/${player.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      onSuccess && onSuccess(updated);
      onClose();
    } catch (e) {
      console.error(e);
      alert("Update player failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Edit Player</h3>

        <label className="block text-sm font-medium">Name</label>
        <input className="w-full mb-3 p-2 border rounded" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <label className="block text-sm font-medium">Tournament</label>
        <input className="w-full mb-3 p-2 border rounded" value={form.tournament} onChange={(e) => setForm({ ...form, tournament: e.target.value })} />

        <div className="mb-3">
          <label className="block text-sm font-medium">Replace Image (optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
          <button onClick={handleSave} disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white">{loading ? "Saving..." : "Save"}</button>
        </div>
      </div>
    </div>
  );
}
