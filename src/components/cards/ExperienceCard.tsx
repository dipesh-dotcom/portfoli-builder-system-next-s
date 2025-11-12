"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Building,
  Briefcase,
  Calendar,
  Edit,
  Trash2,
  Sparkles,
  Loader2,
} from "lucide-react";

type ExperienceCardProps = {
  experience: {
    id: string;
    companyName: string;
    position: string;
    startYear: string;
    endYear: string;
    description?: string;
  };
  onEdit: () => void;
  onDelete: () => void;
  index?: number;
  highlight?: boolean;
  loading?: boolean;
};

export function ExperienceCard({
  experience,
  onEdit,
  onDelete,
  index = 0,
  highlight = false,
  loading = false,
}: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const duration =
    Number.parseInt(experience.endYear) - Number.parseInt(experience.startYear);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: highlight ? 1.03 : 1,
      }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div
        className={`relative bg-card/95 backdrop-blur-xl border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 group-hover:shadow-md ${
          highlight ? "ring-2 ring-primary/50" : ""
        }`}
      >
        <div className="relative p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 space-y-2">
              <div className="flex items-start gap-2">
                {/* Company Icon */}
                <motion.div
                  className="p-1.5 bg-muted rounded-lg mt-1"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Building className="w-4 h-4 text-primary" />
                </motion.div>

                {/* Company & Position */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {experience.companyName}
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
                    <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {experience.position}
                    </p>
                  </div>
                </div>
              </div>

              {/* Duration & Description */}
              <div className="space-y-1.5 pl-8">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {experience.startYear} - {experience.endYear}
                  </span>
                  <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {duration} {duration === 1 ? "year" : "years"}
                  </span>
                </div>

                {experience.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {experience.description}
                  </p>
                )}

                {/* Flat progress line */}
                <div className="w-full h-0.5 bg-primary rounded-full overflow-hidden" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex sm:flex-col gap-1.5">
              {/* Edit */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onEdit}
                  className="h-8 w-8"
                >
                  <Edit className="w-3.5 h-3.5" />
                </Button>
              </motion.div>

              {/* Delete */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                  disabled={loading}
                  className={`h-8 w-8 ${
                    loading ? "cursor-not-allowed opacity-60" : ""
                  }`}
                >
                  {loading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-destructive" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
