// components/ApiRowEditor.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ApiRowEditor({ entry, onSave, onCancel }) {
  const [limit, setLimit] = useState(entry.limit);
  const [status, setStatus] = useState(entry.status);
    const [usage, setUsage] = useState(entry.usage || 0); // Assuming usage is part of the entry

  const handleSave = () => {
    onSave({ ...entry, limit, status, usage });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-lg font-bold">Edit API Entry</h2>
        <label htmlFor="Limit">Limit</label>
        <Input
          label="Limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          type="number"
        />
        <label htmlFor="Usage">Usage</label>
        <Input
          label="Usage"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          type="number"
          className="mt-2" />
        <label htmlFor="Status">API Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
