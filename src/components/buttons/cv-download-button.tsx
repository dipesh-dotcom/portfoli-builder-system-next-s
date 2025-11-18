// components/download-button.tsx
"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { generateCVPDF } from "@/lib/pdf-generator";

export function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await generateCVPDF();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
    >
      <Download className="w-4 h-4" />
      {isDownloading ? "Downloading..." : "Download CV"}
    </button>
  );
}
