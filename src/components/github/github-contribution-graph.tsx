"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, TrendingUp } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: "none" | "low" | "medium" | "high" | "highest";
}

interface GitHubStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  weekContributions: number;
  monthContributions: number;
  contributions: ContributionDay[];
  repositories: Array<{
    name: string;
    url: string;
    stars: number;
    language: string;
  }>;
}

export function GitHubContributionGraph({ username }: { username: string }) {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const response = await fetch(
          `/api/github/contributions?username=${username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub data");
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchGitHubData();
    }
  }, [username]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>GitHub Contributions</CardTitle>
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
            GitHub Data Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const getColor = (level: string) => {
    switch (level) {
      case "none":
        return "bg-muted";
      case "low":
        return "bg-green-200 dark:bg-green-900";
      case "medium":
        return "bg-green-400 dark:bg-green-700";
      case "high":
        return "bg-green-600 dark:bg-green-500";
      case "highest":
        return "bg-green-800 dark:bg-green-400";
      default:
        return "bg-muted";
    }
  };

  // Group contributions by weeks (7 columns)
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  data.contributions.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalContributions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {data.currentStreak}
              <span className="text-lg">🔥</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Longest Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.longestStreak}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.weekContributions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Contribution Graph */}
      <Card>
        <CardHeader>
          <CardTitle>Contributions ({new Date().getFullYear()})</CardTitle>
          <CardDescription>
            Activity in {new Date().getFullYear()}
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="space-y-2">
            {/* Month Labels */}
            <div
              className="flex min-w-max relative h-5 mb-1"
              style={{ paddingLeft: "32px" }}
            >
              {(() => {
                const months: { name: string; position: number }[] = [];
                let lastMonth = -1;

                weeks.forEach((week, index) => {
                  const firstDay = week[0];
                  const month = new Date(firstDay.date).getMonth();

                  if (month !== lastMonth) {
                    months.push({
                      name: new Date(firstDay.date).toLocaleString("default", {
                        month: "short",
                      }),
                      position: index,
                    });
                    lastMonth = month;
                  }
                });

                return months.map((month, idx) => (
                  <div
                    key={idx}
                    className="text-xs text-muted-foreground absolute"
                    style={{
                      left: `${32 + month.position * 16}px`,
                    }}
                  >
                    {month.name}
                  </div>
                ));
              })()}
            </div>

            {/* Contribution Graph */}
            <div className="flex gap-1 min-w-max">
              {/* Day Labels */}
              <div className="flex flex-col gap-1 pr-2 text-xs text-muted-foreground justify-around w-6">
                <div>Mon</div>
                <div className="invisible">Wed</div>
                <div>Fri</div>
              </div>

              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => {
                    const date = new Date(day.date);
                    const formattedDate = date.toLocaleDateString("default", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    const contributionText =
                      day.count === 0
                        ? "No contributions"
                        : day.count === 1
                        ? "1 contribution"
                        : `${day.count} contributions`;

                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-3 h-3 rounded-sm ${getColor(
                          day.level
                        )} cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all`}
                        title={`${contributionText} on ${formattedDate}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-muted" />
                <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900" />
                <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700" />
                <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500" />
                <div className="w-3 h-3 rounded-sm bg-green-800 dark:bg-green-400" />
              </div>
              <span>More</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Repositories */}
      {data.repositories && data.repositories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Repositories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.repositories.slice(0, 5).map((repo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline truncate block"
                    >
                      {repo.name}
                    </a>
                    {repo.language && (
                      <p className="text-xs text-muted-foreground">
                        {repo.language}
                      </p>
                    )}
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    ⭐ {repo.stars}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
