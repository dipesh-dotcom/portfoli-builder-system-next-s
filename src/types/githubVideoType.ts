export interface GitHubVideoData {
  username: string;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  weekContributions: number;
  monthContributions: number;
  contributions: Array<{
    date: string;
    count: number;
    level: "none" | "low" | "medium" | "high" | "highest";
  }>;
  repositories: Array<{
    name: string;
    url: string;
    stars: number;
    language: string;
  }>;
}
