"use client";

import { useState } from "react";

import DashboardStats from "@/components/admin/DashboardStats";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
        </div>
      </div>

      <DashboardStats />
    </div>
  );
}
