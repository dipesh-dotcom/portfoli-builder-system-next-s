import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { DashboardContent } from "@/components/client/DashboardContent";

const DashbaordPage = async () => {
  const user = await currentUser();

  if (!user) {
    return <div>Please log in.</div>;
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  return (
    <div>
      Welcome, {dbUser?.name ?? "User"}!
      <DashboardContent />
    </div>
  );
};

export default DashbaordPage;
