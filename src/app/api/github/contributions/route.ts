import { NextResponse } from "next/server";

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

const CONTRIBUTION_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      repositories(
        first: 5
        orderBy: { field: STARGAZERS, direction: DESC }
        ownerAffiliations: OWNER
        privacy: PUBLIC
      ) {
        nodes {
          name
          url
          stargazerCount
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;

function getContributionLevel(
  count: number
): "none" | "low" | "medium" | "high" | "highest" {
  if (count === 0) return "none";
  if (count <= 3) return "low";
  if (count <= 6) return "medium";
  if (count <= 9) return "high";
  return "highest";
}

function calculateStreaks(contributions: ContributionDay[]): {
  currentStreak: number;
  longestStreak: number;
} {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) {
      tempStreak++;
      if (i === contributions.length - 1 || currentStreak > 0) {
        currentStreak = tempStreak;
      }
    } else {
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
      if (i === contributions.length - 1) {
        currentStreak = 0;
      }
      tempStreak = 0;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak);
  return { currentStreak, longestStreak };
}

async function fetchGitHubData(
  username: string,
  token: string
): Promise<GitHubStats> {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTION_QUERY,
      variables: {
        username,
        from: oneYearAgo.toISOString(),
        to: today.toISOString(),
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  if (!data.data?.user) {
    throw new Error("User not found");
  }

  const { contributionsCollection, repositories } = data.data.user;
  const { contributionCalendar } = contributionsCollection;

  const contributions: ContributionDay[] = [];
  contributionCalendar.weeks.forEach((week: any) => {
    week.contributionDays.forEach((day: any) => {
      contributions.push({
        date: day.date,
        count: day.contributionCount,
        level: getContributionLevel(day.contributionCount),
      });
    });
  });

  const { currentStreak, longestStreak } = calculateStreaks(contributions);

  const last7Days = contributions.slice(-7);
  const last30Days = contributions.slice(-30);

  const weekContributions = last7Days.reduce((sum, day) => sum + day.count, 0);
  const monthContributions = last30Days.reduce(
    (sum, day) => sum + day.count,
    0
  );

  const topRepos = repositories.nodes.map((repo: any) => ({
    name: repo.name,
    url: repo.url,
    stars: repo.stargazerCount,
    language: repo.primaryLanguage?.name || "Unknown",
  }));

  return {
    totalContributions: contributionCalendar.totalContributions,
    currentStreak,
    longestStreak,
    weekContributions,
    monthContributions,
    contributions,
    repositories: topRepos,
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { success: false, message: "Username parameter is required" },
        { status: 400 }
      );
    }

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message:
            "GitHub token not configured. Please set GITHUB_TOKEN environment variable.",
        },
        { status: 500 }
      );
    }

    const stats = await fetchGitHubData(username, token);

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch GitHub data",
      },
      { status: 500 }
    );
  }
}
