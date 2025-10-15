"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Save, X } from "lucide-react";

type ResumeFormProps = {
  onSubmit: (file: File) => void;
  onCancel?: () => void;
  initialData?: { resume_file: string };
  isLoading?: boolean;
};

export function ResumeForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}: ResumeFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setIsSubmitting(true);
    try {
      await onSubmit(file);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative group">
        {/* Card Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

        <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {initialData ? "Update Resume" : "Upload Resume"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Upload your resume file (PDF, DOC, DOCX)
              </p>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
                className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                required={!initialData}
              />
              {initialData && !file && (
                <p className="text-sm text-muted-foreground mt-1">
                  Current file: {initialData.resume_file.split("/").pop()}
                </p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting || isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Save className="w-5 h-5 mr-2" />
                    {initialData ? "Update Resume" : "Upload Resume"}
                  </span>
                )}
              </Button>

              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting || isLoading}
                  className="flex-1 sm:flex-none bg-card border-border hover:bg-muted hover:border-destructive/30 text-foreground transition-all duration-300 hover:scale-[1.02]"
                >
                  <X className="w-5 h-5 mr-2" />
                  Cancel
                </Button>
              )}
            </motion.div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
