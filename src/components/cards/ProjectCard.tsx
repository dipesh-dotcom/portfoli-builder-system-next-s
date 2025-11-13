"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Github,
  ExternalLink,
  Edit,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/types/user/projectTypes";

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
  const handleOpenUrl = (url: string | null) => {
    if (url) window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
    >
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0 flex flex-col">
          {/* Image container with relative position */}
          <div className="relative w-full h-40 rounded-t-lg overflow-hidden bg-muted/30">
            {project.preview_image ? (
              <Image
                src={project.preview_image}
                alt={project.title}
                width={400}
                height={160}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              </div>
            )}

            {/* Edit/Delete buttons inside image container */}
            {(onEdit || onDelete) && (
              <div className="absolute top-2 right-2 flex gap-2 z-20">
                {onEdit && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onEdit(project)}
                    aria-label="Edit project"
                    className="h-8 w-8 hover:text-primary hover:bg-primary/10"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onDelete(project)}
                    aria-label="Delete project"
                    className="h-8 w-8 hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Title & Description */}
          <div className="p-4 flex flex-col gap-2">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-semibold">
                {project.title}
              </CardTitle>
            </CardHeader>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {project.description}
            </p>

            {/* GitHub & Demo Buttons */}
            <div className="flex justify-between items-center mt-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenUrl(project.github_url)}
                disabled={!project.github_url}
                className="flex items-center gap-1.5 text-xs flex-1"
              >
                <Github className="w-4 h-4" /> GitHub
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={() => handleOpenUrl(project.demo_url)}
                disabled={!project.demo_url}
                className="flex items-center gap-1.5 text-xs flex-1"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
