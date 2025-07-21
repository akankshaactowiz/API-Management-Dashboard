import { useState } from 'react';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setApiData(null);

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setApiData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch API');
    }
  };

  const renderTable = () => {
    if (!apiData) return null;

    if (Array.isArray(apiData)) {
      const keys = Object.keys(apiData[0] || {});
      return (
        <table className="w-full mt-4 border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              {keys.map((key) => (
                <th key={key} className="px-3 py-2 border">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apiData.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                {keys.map((key) => (
                  <td key={key} className="px-3 py-2 border">{JSON.stringify(row[key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    // If API returned a single object
    return (
      <pre className="bg-gray-100 mt-4 p-4 rounded overflow-x-auto">
        {JSON.stringify(apiData, null, 2)}
      </pre>
    );
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">API Dashboard</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="API Endpoint URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Fetch API Data
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {renderTable()}
      </div>
    </div>
  );
};

export default Dashboard;
