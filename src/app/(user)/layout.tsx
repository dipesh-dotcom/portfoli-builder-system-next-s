import { UserDashboardLayout } from "@/components/client/UserDashboardLayout";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";

export default function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserDashboardLayout>
        {children} <Toaster />
      </UserDashboardLayout>
    </>
  );
}
