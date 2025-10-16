"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const duration =
    Number.parseInt(experience.endYear) - Number.parseInt(experience.startYear);

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
      animate={{
        opacity: 1,
        y: 0,
        scale: highlight ? 1.03 : 1,
        boxShadow: highlight
          ? "0px 0px 15px rgba(99,102,241,0.5)"
          : "0px 0px 0px transparent",
      }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-pink-400 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-700 animate-gradient-xy" />

      {/* Hover Radial Light */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Main Card */}
      <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20">
        {/* Light Sweep Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Card Content */}
        <div className="relative p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 space-y-2">
              <div className="flex items-start gap-2">
                {/* Company Icon */}
                <motion.div
                  className="p-1.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mt-1 relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Building className="w-4 h-4 text-primary relative z-10" />
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
                      <Sparkles className="w-3.5 h-3.5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

                {/* Bottom Gradient Line */}
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

            {/* Buttons */}
            <div className="flex sm:flex-col gap-1.5">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onEdit}
                  className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-300 relative overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                  <Edit className="w-3.5 h-3.5 relative z-10" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                  disabled={loading}
                  className={`h-8 w-8 transition-all duration-300 relative overflow-hidden group/btn ${
                    loading
                      ? "cursor-not-allowed opacity-60"
                      : "hover:bg-destructive/10 hover:text-destructive"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-destructive" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-destructive/0 via-destructive/20 to-destructive/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                      <Trash2 className="w-3.5 h-3.5 relative z-10" />
                    </>
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
