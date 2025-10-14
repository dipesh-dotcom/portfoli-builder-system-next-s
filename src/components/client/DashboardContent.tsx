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
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="bg-card border-border hover:border-primary/30 relative overflow-hidden group transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className={`h-10 w-10 rounded-full bg-${stat.color}/10 flex items-center justify-center border border-${stat.color}/30`}
                >
                  <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                </motion.div>
              </CardHeader>
              <CardContent className="relative z-10">
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="bg-card border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

            <CardHeader className="relative z-10">
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your latest client interactions and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-all group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 group-hover:bg-primary/20 transition-colors"
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
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-card border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent pointer-events-none" />

            <CardHeader className="relative z-10">
              <CardTitle className="text-foreground">Quick Stats</CardTitle>
              <CardDescription className="text-muted-foreground">
                Overview of key metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                {[
                  { label: "Active Projects", value: "12" },
                  { label: "Pending Tasks", value: "28" },
                  { label: "Team Members", value: "8" },
                  { label: "Completion Rate", value: "94%" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:border-secondary/30 transition-all cursor-pointer group"
                  >
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.label}
                    </span>
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      className="text-lg font-bold text-foreground"
                    >
                      {item.value}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
