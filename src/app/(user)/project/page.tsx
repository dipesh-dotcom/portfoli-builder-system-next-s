"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThreeBackground } from "@/components/home/ThreeBackground";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { ProjectCard } from "@/components/cards/ProjectCard";
import type { Project, ProjectData } from "@/types/user/projectTypes";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "@/actions/projects";
import ConfirmDialog from "@/components/cards/ConformationDialog";
import Loader from "@/components/loader/Loader";

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  // Fetch projects
  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const res = await getProjects();
      if (res.success && res.data) {
        setProjects(res.data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // Form submit handler
  const handleSubmit = async (data: ProjectData) => {
    try {
      if (editingProject) {
        const res = await updateProject(editingProject.id, data);
        if (res.success && res.data) {
          setProjects(
            projects.map((proj) =>
              proj.id === editingProject.id ? res.data! : proj
            )
          );
        } else {
          console.error("Error updating project:", res.error);
        }
      } else {
        const res = await createProject(data);
        if (res.success && res.data) {
          setProjects([res.data, ...projects]);
        } else {
          console.error("Error creating project:", res.error);
        }
      }
    } finally {
      setIsFormOpen(false);
      setEditingProject(null);
    }
  };

  // Open confirmation dialog
  const openDeleteConfirm = (id: string) => {
    setSelectedDeleteId(id);
    setIsConfirmOpen(true);
  };

  // Confirm delete handler
  const confirmDelete = async () => {
    if (!selectedDeleteId) return;
    const res = await deleteProject(selectedDeleteId);
    if (res.success) {
      setProjects(projects.filter((proj) => proj.id !== selectedDeleteId));
    } else {
      console.error("Error deleting project:", res.error);
    }
    setIsConfirmOpen(false);
    setSelectedDeleteId(null);
  };

  const handleEdit = (project: Project) => {
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
              Showcase your coding projects and add demo or GitHub links.
            </p>
          </div>

          {!isFormOpen && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white font-medium shadow-md transition-all duration-300"
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
                        ...editingProject,
                        github_url: editingProject.github_url ?? undefined,
                        demo_url: editingProject.demo_url ?? undefined,
                        preview_image:
                          editingProject.preview_image ?? undefined,
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
            {loading ? (
              <div className="col-span-full text-center text-muted-foreground">
                <Loader />
              </div>
            ) : projects.length === 0 ? (
              <div className="relative group col-span-full">
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
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Your First Project
                  </Button>
                </div>
              </div>
            ) : (
              projects.map((project, index) => (
                <Suspense key={project.id} fallback={<Loader />}>
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={() => handleEdit(project)}
                    onDelete={() => openDeleteConfirm(project.id)}
                    index={index}
                  />
                </Suspense>
              ))
            )}
          </motion.div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={confirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
