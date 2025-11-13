"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { ThreeBackground } from "@/components/home/ThreeBackground";
import { EducationForm } from "@/components/forms/EducationForm";
import { EducationCard } from "@/components/cards/EducationCard";
import { Button } from "@/components/ui/button";
import { Plus, GraduationCap } from "lucide-react";
import {
  createEducation,
  updateEducation,
  deleteEducation,
  getEducations,
} from "@/actions/education";
import ConfirmDialog from "@/components/cards/ConformationDialog";

type EducationEntry = {
  id: string;
  userId: string;
  instituteName: string;
  degree: string;
  startYear: string;
  endYear: string;
  createdAt: string;
  updatedAt: string;
};

export default function EducationPage() {
  const [educations, setEducations] = useState<EducationEntry[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEducation, setEditingEducation] =
    useState<EducationEntry | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  // Dialog states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const data: any = await getEducations();
        if (data.success) {
          setEducations(data.data);
        } else {
          toast.error(data.error || "Failed to fetch education entries");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching educations");
      } finally {
        setLoading(false);
      }
    };

    fetchEducations();
  }, []);

  const handleSubmit = async (data: {
    instituteName: string;
    degree: string;
    startYear: string;
    endYear: string;
  }) => {
    try {
      let res: any;
      if (editingEducation) {
        res = await updateEducation(editingEducation.id, {
          ...data,
          startYear: Number(data.startYear),
          endYear: Number(data.endYear),
        });
        if (res.success) {
          setEducations((prev) =>
            prev.map((edu) => (edu.id === editingEducation.id ? res.data : edu))
          );
          setHighlightedId(editingEducation.id);
          toast.success("Education updated successfully");
        } else {
          toast.error(res.error);
        }
      } else {
        res = await createEducation({
          ...data,
          startYear: Number(data.startYear),
          endYear: Number(data.endYear),
        });
        if (res.success) {
          setEducations((prev) => [res.data, ...prev]);
          setHighlightedId(res.data.id);
          toast.success("Education added successfully");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsFormOpen(false);
      setEditingEducation(null);
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
      const res: any = await deleteEducation(selectedDeleteId);
      if (res.success) {
        setEducations((prev) =>
          prev.filter((edu) => edu.id !== selectedDeleteId)
        );
        toast.success("Education deleted successfully");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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

  const handleEdit = (education: EducationEntry) => {
    setEditingEducation(education);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingEducation(null);
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
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              Education
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your educational background and qualifications
            </p>
          </div>

          {!isFormOpen && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Education
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
              <EducationForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                initialData={
                  editingEducation
                    ? {
                        instituteName: editingEducation.instituteName,
                        degree: editingEducation.degree,
                        startYear: editingEducation.startYear,
                        endYear: editingEducation.endYear,
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
            ) : educations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-12 text-center">
                  <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No education entries yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start by adding your educational background
                  </p>
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-primary text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Your First Education
                  </Button>
                </div>
              </motion.div>
            ) : (
              educations.map((education, index) => (
                <EducationCard
                  key={education.id}
                  education={{
                    id: education.id,
                    instituteName: education.instituteName,
                    degree: education.degree,
                    startYear: education.startYear,
                    endYear: education.endYear,
                  }}
                  onEdit={() => handleEdit(education)}
                  onDelete={() => openDeleteConfirm(education.id)}
                  index={index}
                  highlight={highlightedId === education.id}
                  loading={deletingIds.has(education.id)}
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
