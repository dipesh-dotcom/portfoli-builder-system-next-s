"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EducationsTable from "@/components/admin/table/EducationsTable";
import ExperiencesTable from "@/components/admin/table/ExperiencesTable";
import AchievementsTable from "@/components/admin/table/AchievementsTable";
import SkillsTable from "@/components/admin/table/SkillsTable";
import LanguagesTable from "@/components/admin/table/LanguagesTable";
import ProjectsTable from "@/components/admin/table/ProjectsTable";
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
