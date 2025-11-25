import { Composition } from "remotion";
import { GitHubReportComposition } from "./Composition";
import { GitHubVideoData } from "@/types/githubVideoType";

const defaultData: GitHubVideoData = {
  username: "octocat",
  totalContributions: 1234,
  currentStreak: 15,
  longestStreak: 45,
  weekContributions: 23,
  monthContributions: 89,
  contributions: [],
  repositories: [],
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GitHubReport"
        component={GitHubReportComposition}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          data: defaultData,
        }}
      />
    </>
  );
};
