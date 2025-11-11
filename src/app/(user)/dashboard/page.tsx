"use client";
import React from "react";
import prisma from "@/lib/prisma";
import { DashboardContent } from "@/components/client/DashboardContent";
import { useSession } from "next-auth/react";

const DashbaordPage = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      Welcome, {session?.user?.name ?? "User"}!
      <DashboardContent />
    </div>
  );
};

export default DashbaordPage;
