"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Download } from "lucide-react";

type ResumeData = {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: { title: string; company: string; years: string }[];
  education: { degree: string; institution: string; year: string }[];
};

export default function ResumePage() {
  const [resumes, setResumes] = useState<string[]>([]); // URLs of generated PDFs

  const userData: ResumeData = {
    name: "Dipesh Shrestha",
    email: "dipesh@example.com",
    phone: "+977 98xxxxxxx",
    skills: ["React", "Django", "Python"],
    experience: [
      { title: "Frontend Developer", company: "ABC Ltd", years: "2022-2023" },
    ],
    education: [{ degree: "BCA", institution: "XYZ College", year: "2025" }],
  };

  const generateResume = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text(userData.name, 20, 20);

    doc.setFontSize(12);
    doc.text(`Email: ${userData.email}`, 20, 30);
    doc.text(`Phone: ${userData.phone}`, 20, 37);

    doc.setFontSize(16);
    doc.text("Skills:", 20, 50);
    doc.setFontSize(12);
    userData.skills.forEach((skill, i) =>
      doc.text(`- ${skill}`, 25, 60 + i * 7)
    );

    doc.setFontSize(16);
    let yPos = 60 + userData.skills.length * 7 + 10;
    doc.text("Experience:", 20, yPos);
    yPos += 7;
    userData.experience.forEach((exp) => {
      doc.setFontSize(12);
      doc.text(`${exp.title} at ${exp.company} (${exp.years})`, 25, yPos);
      yPos += 7;
    });

    doc.setFontSize(16);
    doc.text("Education:", 20, yPos + 5);
    yPos += 12;
    userData.education.forEach((edu) => {
      doc.setFontSize(12);
      doc.text(`${edu.degree}, ${edu.institution} (${edu.year})`, 25, yPos);
      yPos += 7;
    });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setResumes([pdfUrl, ...resumes]);
  };

  const downloadResume = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Generate Button */}
      <Button
        onClick={generateResume}
        className="bg-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      >
        <Plus className="w-5 h-5" /> Generate Resume
      </Button>

      {/* Generated Resumes */}
      <div className="grid gap-4">
        {resumes.map((url, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-card border border-border rounded-lg p-4"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-foreground" />
              <span className="text-foreground font-medium">
                Resume {idx + 1}
              </span>
            </div>

            <Button
              onClick={() => downloadResume(url)}
              className="bg-primary text-white font-medium shadow hover:shadow-md flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
