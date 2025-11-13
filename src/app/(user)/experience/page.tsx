"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { ThreeBackground } from "@/components/home/ThreeBackground";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { Button } from "@/components/ui/button";
import { Plus, Briefcase } from "lucide-react";
import {
  createExperience,
  updateExperience,
  deleteExperience,
  getExperiences,
} from "@/actions/experience";
import ConfirmDialog from "@/components/cards/ConformationDialog";

type ExperienceEntry = {
  id: string;
  userId: string;
  companyName: string;
  position: string;
  startYear: string;
  endYear: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<ExperienceEntry | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  // Dialog states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data: any = await getExperiences();
        if (data.success) {
          setExperiences(data.data);
        } else {
          toast.error(data.error || "Failed to fetch experiences");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching experiences");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const handleSubmit = async (data: {
    companyName: string;
    position: string;
    startYear: string;
    endYear: string;
    description?: string;
  }) => {
    try {
      let res: any;

      if (editingExperience) {
        res = await updateExperience(editingExperience.id, {
          ...data,
          startYear: Number(data.startYear),
          endYear: Number(data.endYear),
          description: data.description ?? "",
        });

        if (res.success) {
          setExperiences((prev) =>
            prev.map((exp) =>
              exp.id === editingExperience.id ? res.data : exp
            )
          );
          setHighlightedId(editingExperience.id);
          toast.success("Experience updated successfully");
        } else {
          toast.error(res.error);
        }
      } else {
        res = await createExperience({
          ...data,
          startYear: Number(data.startYear),
          endYear: Number(data.endYear),
          description: data.description ?? "",
        });

        if (res.success) {
          setExperiences((prev) => [res.data, ...prev]);
          setHighlightedId(res.data.id);
          toast.success("Experience added successfully");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsFormOpen(false);
      setEditingExperience(null);
      setTimeout(() => setHighlightedId(null), 3000);
    }
  };
  //  Confirmation dialog setup
  const openDeleteConfirm = (id: string) => {
    setSelectedDeleteId(id);
    setIsConfirmOpen(true);
  };
  const confirmDelete = async () => {
    if (!selectedDeleteId) return;

    setDeletingIds((prev) => new Set(prev).add(selectedDeleteId));
    try {
      const res: any = await deleteExperience(selectedDeleteId);
      if (res.success) {
        setExperiences((prev) =>
          prev.filter((exp) => exp.id !== selectedDeleteId)
        );
        toast.success("Experience deleted successfully");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting");
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(selectedDeleteId);
        return newSet;
      });
      setSelectedDeleteId(null);
      setIsConfirmOpen(false);
    }
  };

  const handleEdit = (experience: ExperienceEntry) => {
    setEditingExperience(experience);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingExperience(null);
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
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              Experience
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your professional experiences and career timeline.
            </p>
          </div>

          {!isFormOpen && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Experience
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
              <ExperienceForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                initialData={
                  editingExperience
                    ? {
                        companyName: editingExperience.companyName,
                        position: editingExperience.position,
                        startYear: editingExperience.startYear,
                        endYear: editingExperience.endYear,
                        description: editingExperience.description,
                      }
                    : undefined
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cards */}
        {!isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4"
          >
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin"></div>
              </div>
            ) : experiences.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-12 text-center">
                  <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No experience entries yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start by adding your work experience
                  </p>
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-primary text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Your First Experience
                  </Button>
                </div>
              </motion.div>
            ) : (
              experiences.map((experience, index) => (
                <ExperienceCard
                  key={experience.id}
                  experience={{
                    id: experience.id,
                    companyName: experience.companyName,
                    position: experience.position,
                    startYear: experience.startYear,
                    endYear: experience.endYear,
                    description: experience.description,
                  }}
                  onEdit={() => handleEdit(experience)}
                  onDelete={() => openDeleteConfirm(experience.id)}
                  index={index}
                  highlight={highlightedId === experience.id}
                  loading={deletingIds.has(experience.id)}
                />
              ))
            )}
          </motion.div>
        )}
      </div>
      {/*  Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Delete Education"
        message="Are you sure you want to delete this education record? This action cannot be undone."
        onConfirm={confirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
