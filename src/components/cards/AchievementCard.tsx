import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Edit,
  Trash2,
  Sparkles,
  Trophy,
  Building2,
  Loader2,
} from "lucide-react";

type AchievementCardProps = {
  achievement: {
    id: string;
    title: string;
    issuer: string;
    dateObtained: string;
  };
  onEdit: () => void;
  onDelete: () => void;
  index?: number;
  highlight?: boolean;
  loading?: boolean;
};

export function AchievementCard({
  achievement,
  onEdit,
  onDelete,
  index = 0,
  highlight = false,
  loading = false,
}: AchievementCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(highlight);

  useEffect(() => {
    if (highlight) {
      setIsHighlighted(true);
      const timer = setTimeout(() => setIsHighlighted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [highlight]);

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
      {/* Highlight flash */}
      <AnimatePresence>
        {isHighlighted && (
          <motion.div
            className="absolute inset-0 rounded-xl z-0 pointer-events-none bg-warning/30"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Hover shadow ring */}
      <div className="absolute -inset-0.5 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-60 transition duration-500" />

      {/* Hover glow effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary)/0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Main card */}
      <div className="relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10">
        <div className="relative p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            {/* Achievement Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-start gap-2">
                <motion.div
                  className="p-1.5 bg-primary/10 rounded-lg mt-1"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Trophy className="w-4 h-4 text-primary" />
                </motion.div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {achievement.title}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5 text-sm text-muted-foreground">
                    <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{achievement.issuer}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pl-8">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{achievement.dateObtained}</span>
                </div>

                <div className="w-full h-0.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
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

            {/* Edit / Delete Buttons */}
            <div className="flex sm:flex-col gap-1.5">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onEdit}
                  className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <Edit className="w-3.5 h-3.5" />
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
                  className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
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
