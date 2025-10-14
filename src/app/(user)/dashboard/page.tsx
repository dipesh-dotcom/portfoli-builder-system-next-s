import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

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
  return <div>Welcome, {dbUser?.name ?? "User"}!</div>;
};

export default DashbaordPage;
