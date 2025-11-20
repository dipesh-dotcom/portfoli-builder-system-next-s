"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  Code,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Star,
  FolderPlus,
} from "lucide-react";

interface Activity {
  type: string;
  title: string;
  repository: string;
  timestamp: string;
  url: string;
}

export function GitHubActivityTimeline({ username }: { username: string }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/github/contributions?username=${username}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub activities");
        }

        const result = await response.json();

        if (result.success && result.data.activities) {
          setActivities(result.data.activities);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchActivities();
    }
  }, [username]);

  const getIcon = (type: string) => {
    switch (type) {
      case "PushEvent":
        return (
          <GitCommit className="w-5 h-5 text-green-600 dark:text-green-400" />
        );
      case "PullRequestEvent":
        return (
          <GitPullRequest className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        );
      case "IssuesEvent":
        return <Code className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case "CreateEvent":
        return (
          <FolderPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        );
      case "WatchEvent":
        return (
          <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        );
      default:
        return (
          <GitBranch className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        );
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest GitHub activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border border-primary border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-5 h-5" />
            Activity Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest GitHub activity</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No recent activity found
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest GitHub activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0"
            >
              <div className="flex-shrink-0 pt-1">{getIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <a
                  href={activity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline line-clamp-2 block"
                >
                  {activity.title}
                </a>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.repository}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
