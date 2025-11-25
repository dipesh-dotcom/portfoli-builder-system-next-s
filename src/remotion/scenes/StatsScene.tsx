import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

interface StatsSceneProps {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  monthContributions: number;
}

export const StatsScene: React.FC<StatsSceneProps> = ({
  totalContributions,
  currentStreak,
  longestStreak,
  monthContributions,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    {
      label: "Total Contributions",
      value: totalContributions,
      color: "#58a6ff",
    },
    {
      label: "Current Streak",
      value: `${currentStreak} days`,
      color: "#39d353",
    },
    {
      label: "Longest Streak",
      value: `${longestStreak} days`,
      color: "#f78166",
    },
    { label: "This Month", value: monthContributions, color: "#a371f7" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d1117",
        padding: 60,
      }}
    >
      <h2
        style={{
          fontSize: 48,
          color: "white",
          marginBottom: 40,
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        Statistics
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {stats.map((stat, index) => {
          const delay = index * 10;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: {
              damping: 100,
            },
          });

          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateRight: "clamp",
          });

          const animatedValue =
            typeof stat.value === "number"
              ? Math.floor(
                  interpolate(frame, [delay, delay + 40], [0, stat.value], {
                    extrapolateRight: "clamp",
                  })
                )
              : stat.value;

          return (
            <div
              key={stat.label}
              style={{
                backgroundColor: "#161b22",
                border: "2px solid #30363d",
                borderRadius: 12,
                padding: 40,
                opacity,
                transform: `scale(${cardSpring}) translateY(${interpolate(
                  frame,
                  [delay, delay + 20],
                  [30, 0],
                  { extrapolateRight: "clamp" }
                )}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  color: "#8b949e",
                  marginBottom: 15,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: 56,
                  fontWeight: "bold",
                  color: stat.color,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {animatedValue}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
