"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main
        className={`flex-1 min-h-screen p-10 transition-all duration-300 ${
          sidebarOpen ? "ml-74 bg-gray-200" : "ml-16 bg-gray-200"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
