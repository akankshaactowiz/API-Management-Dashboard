// src/components/ApiInsertForm.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

export default function ApiInsertForm({ onInsert }) {
  const [form, setForm] = useState({ key: "", limit: "",usage: '', status: "active" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.key || !form.limit) return setError("All fields are required.");

    setLoading(true);
    setError("");

    try {
      const newEntry = {
        ...form,
        id: uuidv4(), // temp ID if not using DB
        limit: parseInt(form.limit),
      };

      // Simulate delay
      await new Promise((r) => setTimeout(r, 500));

      onInsert(newEntry); // Call parent to add to list
      setForm({ key: "", limit: "", status: "active" });
    } catch (err) {
      setError("Something went wrong while inserting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <form
      className="space-y-2 p-4 border rounded-lg mt-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold">Insert New API Entry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        placeholder="API Key"
        name="key"
        value={form.key}
        onChange={handleChange}
      />
      <Input
        placeholder="Limit"
        name="limit"
        type="number"
        value={form.limit}
        onChange={handleChange}
      />
      <Input
        placeholder="Usage"
        name="usage"
        type="number"
        value={form.limit}
        onChange={handleChange}
      />
      <select
        name="status"
        className="w-full border p-2 rounded"
        value={form.status}
        onChange={handleChange}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      {error && <p className="text-red-600">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Inserting..." : "Insert"}
      </Button>
    </div>
    </form>
    </>
  );
}
