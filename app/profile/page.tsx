'use client';

import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated") {
    return window.location.href = '/';
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-gray-500">{session?.user?.name}</p>
        <p className="text-sm text-gray-500">{session?.user?.email}</p>
        <p className="text-sm text-gray-500">{session?.user?.image}</p>
        <p className="text-sm text-gray-500">{session?.user?.sid}</p>
        
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </>
  );
}
