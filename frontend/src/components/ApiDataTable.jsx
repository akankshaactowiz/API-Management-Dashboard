// components/ApiTable.jsx
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import ApiRowEditor from "./ApiRowEditor";
import ApiInsertForm from "./ApiInsertForm";
// import axios from "axios";

// const mockData = [
//   { id: "1", name: 'User1', key: "abc123", limit: 1000, status: "active", usage: 200 },
//   { id: "2", name: 'User2', key: "xyz789", limit: 500, status: "inactive", usage: 50 },
// ];

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
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setEditing(null);
  };

  const insertRow = (entry) => {
    setData((prev) => [...prev, entry]);
  };

  return (
    <div className="mt-6">
         <ApiInsertForm onInsert={insertRow} />

      {loading && <p className="text-gray-600 mt-4">Loading data...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {!loading && !error && (
      <table className="w-full table-auto border">
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
            <tr key={entry.id} className="border-t">
              <td className="p-2">{idx + 1}</td>
              <td className="p-2">{entry.name}</td>
              <td className="p-2">{entry.key}</td>
              <td className="p-2">{entry.limit}</td>
              <td className="p-2">{entry.usage}</td>
              <td className="p-2 capitalize">{entry.status}</td>
              <td className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing(entry)}
                >
                  <Pencil size={16} />
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
