import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface ContributionSceneProps {
  contributions: Array<{
    date: string;
    count: number;
    level: "none" | "low" | "medium" | "high" | "highest";
  }>;
}

export const ContributionScene: React.FC<ContributionSceneProps> = ({
  contributions,
}) => {
  const frame = useCurrentFrame();
  const last365 = contributions.slice(-365);

  const colors = {
    none: "#161b22",
    low: "#0e4429",
    medium: "#006d32",
    high: "#26a641",
    highest: "#39d353",
  };

  const cellSize = 11;
  const cellGap = 3;
  const weeks = Math.ceil(last365.length / 7);

  const visibleWeeks = Math.floor(
    interpolate(frame, [0, 60], [0, weeks], {
      extrapolateRight: "clamp",
    })
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d1117",
        padding: 60,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: 48,
          color: "white",
          marginBottom: 40,
          fontFamily: "Arial, sans-serif",
        }}
      >
        Contribution Activity
      </h2>
      <div
        style={{
          display: "flex",
          gap: cellGap,
        }}
      >
        {Array.from({ length: visibleWeeks }).map((_, week) => (
          <div
            key={week}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: cellGap,
            }}
          >
            {Array.from({ length: 7 }).map((_, day) => {
              const index = week * 7 + day;
              if (index >= last365.length) return null;

              const contribution = last365[index];
              return (
                <div
                  key={`${week}-${day}`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: colors[contribution.level],
                    borderRadius: 2,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 20,
          color: "#8b949e",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {last365.reduce((sum, c) => sum + c.count, 0)} contributions in the last
        year
      </div>
    </AbsoluteFill>
  );
};
