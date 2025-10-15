"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThreeBackground } from "@/components/ThreeBackground";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { ProjectCard } from "@/components/cards/ProjectCard";

type ProjectEntry = {
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

export default async function ProjectPage() {
  const [projects, setProjects] = useState<ProjectEntry[]>([
    {
      id: "1",
      user_id: "user_1",
      title: "Portfolio Builder System",
      description:
        "A full-stack platform where users can build and share personal portfolios using React and Django REST.",
      github_url: "https://github.com/dipesh/portfolio-builder",
      demo_url: "https://portfolio-demo.vercel.app",
      preview_image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user_1",
      title: "Fake News Detection",
      description:
        "A machine learning system to classify news articles as real or fake using NLP and Django API.",
      github_url: "https://github.com/dipesh/fake-news-detector",
      demo_url: "https://fake-news-demo.vercel.app",
      preview_image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user_1",
      title: "Fake News Detection",
      description:
        "A machine learning system to classify news articles as real or fake using NLP and Django API.",
      github_url: "https://github.com/dipesh/fake-news-detector",
      demo_url: "https://fake-news-demo.vercel.app",
      preview_image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user_1",
      title: "Fake News Detection",
      description:
        "A machine learning system to classify news articles as real or fake using NLP and Django API.",
      github_url: "https://github.com/dipesh/fake-news-detector",
      demo_url: "https://fake-news-demo.vercel.app",
      preview_image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectEntry | null>(
    null
  );

  const handleSubmit = (data: {
    title: string;
    description: string;
    github_url: string;
    demo_url: string;
    preview_image: string;
  }) => {
    if (editingProject) {
      setProjects(
        projects.map((proj) =>
          proj.id === editingProject.id
            ? { ...proj, ...data, updated_at: new Date().toISOString() }
            : proj
        )
      );
    } else {
      const newProject: ProjectEntry = {
        id: Date.now().toString(),
        user_id: "user_1",
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setProjects([newProject, ...projects]);
    }
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((proj) => proj.id !== id));
  };

  const handleEdit = (project: ProjectEntry) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  return (
    <>
      <ThreeBackground />
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FolderGit2 className="w-8 h-8 text-primary" />
              </div>
              Projects
            </h1>
            <p className="text-muted-foreground mt-2">
              Showcase your coding projects and add demo or GitHub links
            </p>
          </div>

          {!isFormOpen && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Project
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                initialData={
                  editingProject
                    ? {
                        title: editingProject.title,
                        description: editingProject.description,
                        github_url: editingProject.github_url,
                        demo_url: editingProject.demo_url,
                        preview_image: editingProject.preview_image,
                      }
                    : undefined
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects */}
        {!isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group col-span-full"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-pink-400/20 rounded-2xl blur opacity-30" />
                <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-12 text-center">
                  <FolderGit2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No projects added yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start by showcasing your first project
                  </p>
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Your First Project
                  </Button>
                </div>
              </motion.div>
            ) : (
              projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={() => handleEdit(project)}
                  onDelete={() => handleDelete(project.id)}
                  index={index}
                />
              ))
            )}
          </motion.div>
        )}
      </div>
    </>
  );
}
