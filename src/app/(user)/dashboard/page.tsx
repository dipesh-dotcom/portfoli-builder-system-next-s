"use client";

import { useSession } from "next-auth/react";

const DashbaordPage = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return <div>Please log in.</div>;
  }

  return (
    <div className="flex text-5xl justify-center items-center">
      Welcome, {session?.user?.name ?? "User"}!
    </div>
  );
};

export default DashbaordPage;
