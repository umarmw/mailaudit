"use client"; // This enables the use of hooks and state in server components

import React, { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple URL validation
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // Protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // Domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // Query string
      "(\\#[-a-z\\d_]*)?$", // Fragment locator
      "i"
    );

    if (!urlPattern.test(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setError(""); // Clear the error if URL is valid

    // Make the API call here
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit URL");
      }

      const data = await response.json();
      console.log("Success:", data);
      // Handle success (e.g., display a message or process response)
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl text-gray-700 font-bold mb-4 text-center">Test URL</h1>

        <div className="mb-4">
          <label htmlFor="url" className="block text-gray-700 font-semibold">
            URL:
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`w-full mt-2 text-gray-700 p-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
            placeholder="Enter a valid URL"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
