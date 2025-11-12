"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Edit, Trash2 } from "lucide-react";

type Project = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  github_url: string;
  demo_url: string;
  preview_image: string;
  created_at: string;
  updated_at: string;
};

type ProjectCardProps = {
  project: Project;
  index?: number;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
};

export function ProjectCard({
  project,
  index = 0,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      className="
        relative group bg-card border border-border/60 
        dark:bg-zinc-900 hover:border-primary/50 
        hover:shadow-primary/10 hover:shadow-md
        rounded-xl p-5 transition-all duration-300 
        flex flex-col justify-between
      "
    >
      {/* Edit / Delete */}
      {(onEdit || onDelete) && (
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          {onEdit && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(project)}
              className="h-8 w-8 hover:text-primary hover:bg-primary/10"
              aria-label="Edit project"
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(project)}
              className="h-8 w-8 hover:text-destructive hover:bg-destructive/10"
              aria-label="Delete project"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {/* Preview image */}
      <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
        <img
          src={project.preview_image || "/placeholder-image.jpg"}
          alt={project.title}
          onError={(e) => (e.currentTarget.src = "/placeholder-image.jpg")}
          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
        {project.description}
      </p>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            project.github_url && window.open(project.github_url, "_blank")
          }
          disabled={!project.github_url}
          className="flex items-center gap-1.5 text-xs"
        >
          <Github className="w-4 h-4" /> GitHub
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={() =>
            project.demo_url && window.open(project.demo_url, "_blank")
          }
          disabled={!project.demo_url}
          className="flex items-center gap-1.5 text-xs"
        >
          <ExternalLink className="w-4 h-4" /> Live Demo
        </Button>
      </div>
    </motion.div>
  );
}
