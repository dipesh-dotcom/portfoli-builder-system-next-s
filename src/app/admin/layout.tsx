"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { AdminDashboardLayout } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <AdminDashboardLayout>
        {children} <Toaster />
      </AdminDashboardLayout>
    </>
  );
}
