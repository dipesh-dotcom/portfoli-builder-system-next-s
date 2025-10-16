"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Building2,
  GraduationCap,
  Calendar,
  Edit,
  Trash2,
  Sparkles,
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
  highlight?: boolean; // NEW: highlight prop
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(highlight);

  useEffect(() => {
    if (highlight) {
      setIsHighlighted(true);
      const timer = setTimeout(() => setIsHighlighted(false), 3000); // highlight for 3s
      return () => clearTimeout(timer);
    }
  }, [highlight]);

  const duration =
    Number.parseInt(education.endYear) - Number.parseInt(education.startYear);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Highlight animation */}
      <AnimatePresence>
        {isHighlighted && (
          <motion.div
            className="absolute inset-0 rounded-xl z-0 pointer-events-none"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
            style={{ backgroundColor: "rgba(255, 245, 157, 0.4)" }} // soft yellow highlight
          />
        )}
      </AnimatePresence>

      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-pink-400 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-700 animate-gradient-xy" />

      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
          }}
        />
      )}

      <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 z-10">
        <div className="relative p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 space-y-2">
              <div className="flex items-start gap-2">
                <motion.div
                  className="p-1.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mt-1 relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Building2 className="w-4 h-4 text-primary relative z-10" />
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
                      <Sparkles className="w-3.5 h-3.5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

                <div className="w-full h-0.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-pink-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      delay: index * 0.1 + 0.5,
                      duration: 1,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col gap-1.5">
              <Button variant="ghost" size="icon" onClick={onEdit}>
                <Edit className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onDelete}>
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="w-12 h-12 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin"></div>
                  </div>
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
