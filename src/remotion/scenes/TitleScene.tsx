import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

interface TitleSceneProps {
  username: string;
}

export const TitleScene: React.FC<TitleSceneProps> = ({ username }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
  });

  const translateY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d1117",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale}) translateY(${translateY}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
          }}
        >
          @{username}'s
        </h1>
        <h2
          style={{
            fontSize: 60,
            color: "#58a6ff",
            textAlign: "center",
            marginTop: 20,
            fontFamily: "Arial, sans-serif",
          }}
        >
          GitHub Report
        </h2>
      </div>
    </AbsoluteFill>
  );
};
