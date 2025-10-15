import { UserDashboardLayout } from "@/components/client/UserDashboardLayout";
import React, { Suspense } from "react";

export default function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserDashboardLayout>{children}</UserDashboardLayout>
    </>
  );
}
