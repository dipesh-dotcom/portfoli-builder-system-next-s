import { DownloadButton } from "@/components/buttons/cv-download-button";
import { CVWrapper } from "@/components/cv-wrapper";

export default async function CVPage() {
  return (
    <div>
      {/* Download Button */}
      <div className="sticky top-0 z-50 bg-background border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex justify-end">
          <DownloadButton />
        </div>
      </div>

      {/* CV Content */}
      <CVWrapper />
    </div>
  );
}
