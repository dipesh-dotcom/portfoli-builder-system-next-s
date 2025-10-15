"use client";

import React from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

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
    <CardContainer className="inter-var">
      <CardBody
        className="
          relative group/card 
          bg-card/95 backdrop-blur-xl 
          dark:bg-zinc-900 dark:border-white/[0.15] border border-border
          hover:border-primary/50 transition-all duration-500
          w-full sm:w-[22rem] h-auto rounded-xl p-5
          shadow-md hover:shadow-2xl hover:shadow-primary/10
        "
      >
        {/* Edit & Delete buttons */}
        {(onEdit || onDelete) && (
          <div className="absolute top-3 right-3 flex gap-2 z-20">
            {onEdit && (
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(project)}
                  className="h-8 w-8 hover:bg-primary/10 hover:text-primary relative overflow-hidden group/btn"
                >
                  <Edit className="w-4 h-4 relative z-10" />
                </Button>
              </motion.div>
            )}
            {onDelete && (
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(project)}
                  className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive relative overflow-hidden group/btn"
                >
                  <Trash2 className="w-4 h-4 relative z-10" />
                </Button>
              </motion.div>
            )}
          </div>
        )}

        {/* Title */}
        <CardItem
          translateZ="70"
          className="text-lg font-semibold text-foreground group-hover/card:text-primary transition-colors duration-300"
        >
          {project.title}
        </CardItem>

        {/* Description */}
        <CardItem
          as="p"
          translateZ="90"
          className="text-sm text-muted-foreground mt-2 leading-relaxed"
        >
          {project.description.length > 120
            ? project.description.slice(0, 120) + "..."
            : project.description}
        </CardItem>

        {/* Preview Image */}
        <CardItem translateZ="110" className="w-full mt-4">
          <img
            src={project.preview_image}
            alt={project.title}
            className="w-full h-48 object-cover rounded-lg transition-transform duration-500 group-hover/card:scale-[1.03] group-hover/card:shadow-xl"
          />
        </CardItem>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <CardItem translateZ="40" translateX={-20}>
            <Button
              variant="outline"
              size="sm"
              className="text-xs flex items-center gap-1.5 dark:text-white hover:bg-primary/10"
              onClick={() => window.open(project.github_url, "_blank")}
            >
              <Github className="w-4 h-4" /> GitHub
            </Button>
          </CardItem>

          <CardItem translateZ="40" translateX={20}>
            <Button
              variant="default"
              size="sm"
              className="text-xs flex items-center gap-1.5"
              onClick={() => window.open(project.demo_url, "_blank")}
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </Button>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
