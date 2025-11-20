"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GithubIcon, X } from "lucide-react";
import { GitHubContributionGraph } from "@/components/github/github-contribution-graph";
import { GitHubActivityTimeline } from "@/components/github/github-activity-timeline";

const STORAGE_KEY = "github_username";

export default function DashboardContent() {
  const [username, setUsername] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load saved username on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem(STORAGE_KEY);
    if (savedUsername) {
      setUsername(savedUsername);
    }
    setIsLoading(false);
  }, []);

  const handleSearch = () => {
    if (inputValue.trim()) {
      const newUsername = inputValue.trim();
      setUsername(newUsername);
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, newUsername);
      setInputValue("");
    }
  };

  const handleClearUsername = () => {
    setUsername("");
    localStorage.removeItem(STORAGE_KEY);
    setInputValue("");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border border-primary border-t-transparent" />
          </div>
        </div>
      </main>
    );
  }

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
            <CardTitle>
              {username ? "Change GitHub User" : "Search GitHub User"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {username && (
              <div className="mb-4 p-3 bg-muted rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current User</p>
                  <p className="font-semibold text-lg">@{username}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearUsername}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              </div>
            )}
            <div className="flex gap-2">
              <Input
                placeholder="Enter GitHub username..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch}>
                {username ? "Change" : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Content */}
        {username ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GitHubContributionGraph username={username} />
            </div>
            <div>
              <GitHubActivityTimeline username={username} />
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <GithubIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">
                  Enter a GitHub username to get started
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
