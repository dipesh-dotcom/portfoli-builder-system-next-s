"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface GitHubVideoReportProps {
  username: string;
  onClose: () => void;
}

export default function GitHubVideoReport({
  username,
  onClose,
}: GitHubVideoReportProps) {
  const [stats, setStats] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function loadData() {
      const res = await fetch(`/api/github/contributions?username=${username}`);
      const json = await res.json();
      if (json.success) setStats(json.data);
    }
    loadData();
  }, [username]);

  const getContributionColor = (level: string) => {
    switch (level) {
      case "none":
        return "#161b22";
      case "low":
        return "#39d35388";
      case "medium":
        return "#39d353aa";
      case "high":
        return "#39d353cc";
      case "highest":
        return "#39d353";
      default:
        return "#161b22";
    }
  };

  const generateVideo = () => {
    if (!stats) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsGenerating(true);
    setProgress(0);

    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stream = canvas.captureStream(30); // 30 FPS
    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9",
    });

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setIsGenerating(false);
    };

    recorder.start();

    const totalFrames = 360; // ~12 seconds
    let frame = 0;

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = "#0d1117";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Header
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 70px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`@${username}'s GitHub Report`, canvas.width / 2, 100);

      // Stats Cards
      const cardData = [
        {
          label: "Total Contributions",
          value: stats.totalContributions,
          color: "#58a6ff",
        },
        {
          label: "Current Streak",
          value: `${stats.currentStreak} days`,
          color: "#39d353",
        },
        {
          label: "Longest Streak",
          value: `${stats.longestStreak} days`,
          color: "#f78166",
        },
        {
          label: "This Week",
          value: stats.weekContributions,
          color: "#a371f7",
        },
        {
          label: "This Month",
          value: stats.monthContributions,
          color: "#f5a623",
        },
      ];

      cardData.forEach((card, i) => {
        const delay = i * 20;
        const progressCard = Math.min(Math.max(frame - delay, 0) / 20, 1);
        if (progressCard > 0) {
          const x = 960;
          const y = 200 + i * 100;
          ctx.globalAlpha = progressCard;

          ctx.fillStyle = "#161b22";
          ctx.fillRect(x - 400, y - 50, 800, 90);
          ctx.strokeStyle = "#30363d";
          ctx.lineWidth = 3;
          ctx.strokeRect(x - 400, y - 50, 800, 90);

          ctx.fillStyle = "#8b949e";
          ctx.font = "24px Arial";
          ctx.fillText(card.label, x, y - 10);

          ctx.fillStyle = card.color;
          ctx.font = "bold 40px Arial";
          ctx.fillText(card.value.toString(), x, y + 30);
          ctx.globalAlpha = 1;
        }
      });

      // Contribution Graph
      const graphStartFrame = cardData.length * 20 + 20;
      if (frame >= graphStartFrame) {
        const graphProgress = Math.min((frame - graphStartFrame) / 40, 1);
        const contribs = stats.contributions.slice(-52); // last 52 weeks
        const squareSize = 20;
        const gap = 4;
        const startX = 400;
        const startY = 750;

        for (let w = 0; w < 52; w++) {
          for (let d = 0; d < 7; d++) {
            const idx = w * 7 + d;
            if (idx >= contribs.length) continue;
            const day = contribs[idx];
            const alpha = graphProgress;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = getContributionColor(day.level);
            ctx.fillRect(
              startX + w * (squareSize + gap),
              startY + d * (squareSize + gap),
              squareSize,
              squareSize
            );
            ctx.globalAlpha = 1;
          }
        }
      }

      // Top Repos
      const repoStartFrame = graphStartFrame + 40;
      if (frame >= repoStartFrame) {
        const repoProgress = Math.min((frame - repoStartFrame) / 20, 1);
        stats.repositories.forEach((repo: any, i: number) => {
          const x = 960;
          const y = 150 + i * 60 + 900;
          ctx.globalAlpha = repoProgress;
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 28px Arial";
          ctx.textAlign = "center";
          ctx.fillText(`${repo.name} ★${repo.stars} (${repo.language})`, x, y);
          ctx.globalAlpha = 1;
        });
      }

      setProgress(Math.floor((frame / totalFrames) * 100));

      frame++;
      if (frame < totalFrames) requestAnimationFrame(animate);
      else recorder.stop();
    };

    animate();
  };

  return (
    <div className="p-6 bg-background rounded-xl border shadow">
      <h2 className="text-2xl font-semibold mb-4">Video Report Preview</h2>

      {!stats ? (
        <p className="text-center text-muted-foreground">Loading stats...</p>
      ) : !videoUrl ? (
        <div className="flex flex-col gap-4">
          <Button onClick={generateVideo} disabled={isGenerating}>
            {isGenerating
              ? `Generating Video... ${progress}%`
              : "Generate Video"}
          </Button>
          {isGenerating && (
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <video width="100%" controls src={videoUrl} />
          <div className="flex gap-2">
            <a href={videoUrl} download={`github-report-${username}.webm`}>
              <Button>Download Video</Button>
            </a>
            <Button
              onClick={async () => {
                if (navigator.share) {
                  await navigator.share({
                    title: "GitHub Report",
                    url: videoUrl,
                    text: `Check out my GitHub report for @${username}!`,
                  });
                } else {
                  alert("Sharing is not supported in this browser.");
                }
              }}
            >
              Share
            </Button>
          </div>
        </div>
      )}

      <Button variant="ghost" className="mt-4" onClick={onClose}>
        Close
      </Button>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
