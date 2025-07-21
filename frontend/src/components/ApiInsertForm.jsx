// src/components/ApiInsertForm.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ApiInsertForm({ onInsert }) {
  const [form, setForm] = useState({
    name: "",
    key: "",
    limit: "",
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.key || !form.limit || !form.name)
      return setError("All fields are required.");

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://172.28.171.64:5000/api/addkey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          key: form.key,
          limit: parseInt(form.limit),
          status: form.status,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg || "Insert failed");
      }

      const newEntry = await res.json();
      onInsert(newEntry);

      setForm({ name: "", key: "", limit: "", status: "active" });
      setSuccess("Key inserted successfully!");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  return (
    <form
      className="space-y-2 p-4 border rounded-lg mt-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold">Insert New API Entry</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
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
        <select
          name="status"
          className="w-full border p-2 rounded"
          value={form.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Inserting..." : "Insert"}
      </Button>
    </form>
  );
}
