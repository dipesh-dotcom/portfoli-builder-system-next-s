"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  BookOpen,
  Briefcase,
  Trophy,
  Code2,
  Languages,
  FolderOpen,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "124",
    icon: Users,
    description: "Active users in system",
  },
  {
    title: "Education Records",
    value: "342",
    icon: BookOpen,
    description: "Total education entries",
  },
  {
    title: "Experience Records",
    value: "298",
    icon: Briefcase,
    description: "Work experiences",
  },
  {
    title: "Achievements",
    value: "156",
    icon: Trophy,
    description: "Certifications & awards",
  },
  {
    title: "Skills",
    value: "487",
    icon: Code2,
    description: "Technical skills",
  },
  {
    title: "Languages",
    value: "89",
    icon: Languages,
    description: "Language entries",
  },
  {
    title: "Projects",
    value: "203",
    icon: FolderOpen,
    description: "Portfolio projects",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
