"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { GitHubContributionGraph } from "@/components/github/github-contribution-graph";
import { GitHubActivityTimeline } from "@/components/github/github-activity-timeline";

export default function DashboardContent() {
  const [username, setUsername] = useState("torvalds"); // Default to Linus Torvalds for demo
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue.trim()) {
      setUsername(inputValue);
      setInputValue("");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GithubIcon className="w-8 h-8" />
            <h1 className="text-4xl font-bold">GitHub Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            View GitHub contribution data and activity
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search GitHub User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter GitHub username..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GitHubContributionGraph username={username} />
          </div>
          <div>
            <GitHubActivityTimeline username={username} />
          </div>
        </div>
      </div>
    </main>
  );
}
