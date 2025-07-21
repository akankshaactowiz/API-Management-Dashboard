// components/ApiForm.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ApiForm() {
  const [url, setUrl] = useState("");
//   const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch data from DB using API Key & URL
    console.log("Submitted:", {
        url, 
        // apiKey 
    });
  };

  return (
    <form className="space-x-4 flex" onSubmit={handleSubmit}>
      <Input
        placeholder="API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      {/* <Input
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        required
      /> */}
      <Button type="submit">Fetch</Button>
    </form>
  );
}
