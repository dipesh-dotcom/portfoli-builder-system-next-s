import { AbsoluteFill, Sequence } from "remotion";
import { TitleScene } from "./scenes/TitleScene";
import { StatsScene } from "./scenes/StatsScene";
import { ContributionScene } from "./scenes/ContributionScene";
import { GitHubVideoData } from "@/types/githubVideoType";

export const GitHubReportComposition: React.FC<{ data: GitHubVideoData }> = ({
  data,
}) => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={60}>
        <TitleScene username={data.username} />
      </Sequence>
      <Sequence from={60} durationInFrames={90}>
        <StatsScene
          totalContributions={data.totalContributions}
          currentStreak={data.currentStreak}
          longestStreak={data.longestStreak}
          monthContributions={data.monthContributions}
        />
      </Sequence>
      <Sequence from={150} durationInFrames={90}>
        <ContributionScene contributions={data.contributions} />
      </Sequence>
    </AbsoluteFill>
  );
};
