"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  FileText,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

export function DashboardContent() {
  const stats = [
    {
      title: "Total Clients",
      value: "2,543",
      change: "+12.5%",
      icon: Users,
      description: "Active clients this month",
      color: "info",
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+8.2%",
      icon: DollarSign,
      description: "Total revenue this month",
      color: "success",
    },
    {
      title: "Growth Rate",
      value: "23.5%",
      change: "+4.3%",
      icon: TrendingUp,
      description: "Compared to last month",
      color: "primary",
    },
  ];

  const recentActivity = [
    { title: "New client onboarded", time: "2 hours ago", icon: Users },
    {
      title: "Project milestone completed",
      time: "5 hours ago",
      icon: Activity,
    },
    { title: "Invoice sent", time: "1 day ago", icon: FileText },
    { title: "Meeting scheduled", time: "2 days ago", icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -3 }}
          >
            <Card className="bg-card border border-border hover:border-primary/30 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`h-10 w-10 rounded-full bg-${stat.color}/10 flex items-center justify-center border border-${stat.color}/30`}
                >
                  <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
                  className="text-3xl font-bold text-foreground"
                >
                  {stat.value}
                </motion.div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/30">
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your latest client interactions and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 2, scale: 1.02 }}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/10 border border-border hover:border-primary/30 transition-all cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30"
                  >
                    <activity.icon className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Stats</CardTitle>
              <CardDescription className="text-muted-foreground">
                Overview of key metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Active Projects", value: "12" },
                { label: "Pending Tasks", value: "28" },
                { label: "Team Members", value: "8" },
                { label: "Completion Rate", value: "94%" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border hover:border-secondary/30 transition-all cursor-pointer"
                >
                  <span className="text-sm text-muted-foreground">
                    {item.label}
                  </span>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="text-lg font-bold text-foreground"
                  >
                    {item.value}
                  </motion.span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
