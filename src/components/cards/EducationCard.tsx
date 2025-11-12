"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Building2,
  GraduationCap,
  Calendar,
  Edit,
  Trash2,
  Sparkles,
  Loader2,
} from "lucide-react";

type EducationCardProps = {
  education: {
    id: string;
    instituteName: string;
    degree: string;
    startYear: string;
    endYear: string;
  };
  onEdit: () => void;
  onDelete: () => void;
  index?: number;
  highlight?: boolean;
  loading?: boolean;
};

export function EducationCard({
  education,
  onEdit,
  onDelete,
  index = 0,
  highlight = false,
  loading = false,
}: EducationCardProps) {
  const [isHighlighted, setIsHighlighted] = useState(highlight);
  const duration =
    Number.parseInt(education.endYear) - Number.parseInt(education.startYear);

  useEffect(() => {
    if (highlight) {
      setIsHighlighted(true);
      const timer = setTimeout(() => setIsHighlighted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [highlight]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, scale: highlight ? 1.03 : 1 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="relative group"
    >
      {/* Highlight */}
      {isHighlighted && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ backgroundColor: "rgba(255, 245, 157, 0.4)" }}
        />
      )}

      <div
        className={`relative bg-card/95 backdrop-blur-xl border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 group-hover:shadow-md ${
          highlight ? "ring-2 ring-primary/50" : ""
        }`}
      >
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 space-y-2">
              <div className="flex items-start gap-2">
                <motion.div
                  className="p-1.5 bg-muted rounded-lg mt-1"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Building2 className="w-4 h-4 text-primary" />
                </motion.div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {education.instituteName}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {education.degree}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pl-8">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {education.startYear} - {education.endYear}
                  </span>
                  <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {duration} {duration === 1 ? "year" : "years"}
                  </span>
                </div>

                {/* Flat bottom line */}
                <div className="w-full h-0.5 bg-primary rounded-full" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex sm:flex-col gap-1.5">
              <Button variant="ghost" size="icon" onClick={onEdit}>
                <Edit className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-destructive" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
