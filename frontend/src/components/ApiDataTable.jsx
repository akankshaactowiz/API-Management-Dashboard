// src/components/ApiTable.jsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import ApiRowEditor from "./ApiRowEditor";
import ApiInsertForm from "./ApiInsertForm";

export default function ApiTable() {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://172.28.171.64:5000/api/getkey", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const json = await res.json();
        console.log("this is json", json);
        setData(json.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 const updateRow = (updated) => {
  setData((prev) =>
    prev.map((item) => (item._id === updated._id ? updated : item))
  );
  setEditing(null);
};


  const insertRow = (entry) => {
    setData((prev) => [...prev, entry]);
  };

  const deleteRow = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this key?");
  if (!confirmed) return;

  try {
    const res = await fetch(`http://172.28.171.64:5000/api/deletekey/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.msg || "Failed to delete");
    }

    // Remove from local state
    setData((prev) => prev.filter((item) => item._id !== id));
  } catch (err) {
    alert(err.message || "Something went wrong.");
  }
};


  return (
    <div className="mt-6">
      <ApiInsertForm onInsert={insertRow} />

      {loading && <p className="text-gray-600 mt-4">Loading data...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {!loading && !error && (
        <table className="w-full table-auto border mt-4">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Key</th>
              <th className="p-2">Limit</th>
              <th className="p-2">Usage</th>
              <th className="p-2">API Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, idx) => (
              <tr key={entry._id || entry.key} className="border-t">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">{entry.name}</td>
                <td className="p-2">{entry.key}</td>
                <td className="p-2">{entry.limit}</td>
                <td className="p-2">{entry.usage ?? 0}</td>
                <td className="p-2 capitalize">
  {entry.status === true ? "Active" : "Inactive"}
</td>
                <td className="p-2 flex gap-2">
  <Button
    variant="ghost"
    size="sm"
    onClick={() => setEditing(entry)}
    title="Edit"
  >
    <Pencil size={16} />
  </Button>
  <Button
    variant="ghost"
    size="sm"
    className="text-red-600"
    onClick={() => deleteRow(entry._id)}
    title="Delete"
  >
    <Trash2 size={16} />
  </Button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editing && (
        <ApiRowEditor
          entry={editing}
          onSave={updateRow}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
}
