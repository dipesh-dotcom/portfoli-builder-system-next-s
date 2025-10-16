"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  Globe,
  Loader2,
  Sparkles,
  GraduationCap,
} from "lucide-react";

type LanguageCardProps = {
  language: {
    id: string;
    name: string;
    proficiency: string; // Beginner, Intermediate, Advanced
  };
  onEdit: () => void;
  onDelete: () => void;
  index?: number;
  highlight?: boolean;
  loading?: boolean;
};

export function LanguageCard({
  language,
  onEdit,
  onDelete,
  index = 0,
  highlight = false,
  loading = false,
}: LanguageCardProps) {
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
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
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
      {/* Card Glow */}
      <div className="absolute -inset-0.5 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-700 bg-gradient-to-r from-indigo-500 via-pink-400 to-indigo-500 animate-gradient-xy" />

      {/* Mouse radial hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Card Container */}
      <div
        className={`relative bg-card/95 backdrop-blur-xl border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 ${
          isHighlighted ? "ring-2 ring-indigo-400" : ""
        }`}
      >
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        <div className="relative p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          {/* Language Info */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <motion.div
                className="p-1.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg relative overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Globe className="w-5 h-5 text-primary relative z-10" />
              </motion.div>

              {/* Name & Proficiency */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {language.name}
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
                    {language.proficiency}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
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

          {/* Action Buttons */}
          <div className="flex sm:flex-col gap-1.5 mt-2 sm:mt-0">
            {/* Edit */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onEdit}
                className="h-8 w-8 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Edit className="w-3.5 h-3.5 relative z-10" />
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
                className="h-8 w-8 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-destructive/0 via-destructive/20 to-destructive/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-destructive" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5 relative z-10" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
