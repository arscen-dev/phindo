'use client';
import { useState } from "react";
import axios from "axios";
import { Message } from "@/types/test";

export default function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMessage = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Message>("/api");
      setMessage(response.data.message);
      console.log(response.data.status);
    } catch (error) {
      console.error("Error fetching message:", error);
      setMessage("Error fetching message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <button
        onClick={fetchMessage}
        disabled={loading}
        className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Get Message"}
      </button>

      {message && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <p className="text-xl text-black">{message}</p>
        </div>
      )}
    </div>
  );
}
