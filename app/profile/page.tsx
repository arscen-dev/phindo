'use client';

import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated") {
    return <div>Unauthenticated</div>;
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-gray-500">{session?.user?.name}</p>
        <p className="text-sm text-gray-500">{session?.user?.email}</p>
        <p className="text-sm text-gray-500">{session?.user?.image}</p>
        <p className="text-sm text-gray-500">{session?.user?.sid}</p>
      </div>
    </>
  );
}
