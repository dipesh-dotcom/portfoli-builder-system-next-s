"use client";

import { useEffect, useState } from "react";
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
import { getDashboardStatsAction } from "@/actions/adminDashboard";
import Loader from "@/components/loader/Loader";

interface Stat {
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  description: string;
}

export default function Dashboard() {
  const [statsData, setStatsData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStatsAction();
        setStatsData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  const stats: Stat[] = [
    {
      title: "Education Records",
      value: statsData.educationRecords ?? 0,
      icon: BookOpen,
      description: "Total education entries",
    },
    {
      title: "Experience Records",
      value: statsData.experienceRecords ?? 0,
      icon: Briefcase,
      description: "Work experiences",
    },
    {
      title: "Achievements",
      value: statsData.achievements ?? 0,
      icon: Trophy,
      description: "Certifications & awards",
    },
    {
      title: "Skills",
      value: statsData.skills ?? 0,
      icon: Code2,
      description: "Technical skills",
    },
    {
      title: "Languages",
      value: statsData.languages ?? 0,
      icon: Languages,
      description: "Language entries",
    },
    {
      title: "Projects",
      value: statsData.projects ?? 0,
      icon: FolderOpen,
      description: "Portfolio projects",
    },
  ];

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
