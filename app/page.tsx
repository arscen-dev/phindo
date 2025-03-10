'use client';
import { useState } from "react";
import axios from "axios";
import { Message } from "@/types/test";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

// Create a client
const queryClient = new QueryClient();

// Wrapper component with QueryClientProvider
function HomeWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

function Home() {
  // Use React Query to fetch the message
  const { data, isLoading, error, refetch } = useQuery<Message>({
    queryKey: ["message"],
    queryFn: async () => {
      const response = await axios.get<Message>("/api");
      return response.data;
    },
    enabled: false, // Don't fetch automatically on component mount
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <button
        onClick={() => refetch()}
        disabled={isLoading}
        className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : "Get Message"}
      </button>
      
      {data?.message && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <p className="text-xl text-black">{data.message}</p>
          {data.status && <p className="text-sm text-gray-500 mt-2">Status: {data.status}</p>}
        </div>
      )}
      
      {error && (
        <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-md">
          <p>Error fetching message</p>
        </div>
      )}
      <GoogleSignInButton />
    </div>
  );
}

// Export the wrapper component as the default export
export default HomeWrapper;
