// src/components/ApiRowEditor.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ApiRowEditor({ entry, onSave, onCancel }) {
  const [form, setForm] = useState({
    limit: entry.limit,
    status: entry.status,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `http://172.28.171.64:5000/api/updatekey/${entry._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || "Failed to update");
      }

      const updated = await res.json();
      onSave(updated);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg mt-4 bg-gray-50 space-y-3"
    >
      <h2 className="text-lg font-semibold">Edit Entry - {entry.name}</h2>

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="limit"
          type="number"
          placeholder="Limit"
          value={form.limit}
          onChange={handleChange}
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="space-x-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
