"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeBackground } from "@/components/ThreeBackground";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { Button } from "@/components/ui/button";
import { Plus, Briefcase } from "lucide-react";

// Define experience type
type ExperienceEntry = {
  id: string;
  user_id: string;
  company_name: string;
  position: string;
  start_date: string; // backend expects full date
  end_date: string;
  description: string;
};

// Form data type
type ExperienceFormData = {
  company_name: string;
  position: string;
  start_date: string;
  end_date: string;
  description?: string;
};

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([
    {
      id: "1",
      user_id: "user_1",
      company_name: "Google",
      position: "Frontend Developer",
      start_date: "2021-01-01",
      end_date: "2023-03-01",
      description:
        "Worked on UI components and dashboards using React, TypeScript, and Tailwind CSS.",
    },
    {
      id: "2",
      user_id: "user_1",
      company_name: "Meta",
      position: "UI/UX Designer",
      start_date: "2019-05-01",
      end_date: "2020-12-01",
      description:
        "Designed modern interfaces for social media tools with cross-platform consistency.",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<ExperienceEntry | null>(null);

  // 🧩 Handle add/edit submission
  const handleSubmit = (data: ExperienceFormData) => {
    if (editingExperience) {
      // Update existing experience
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === editingExperience.id ? { ...exp, ...data } : exp
        )
      );
    } else {
      // Add new experience
      const newExperience: ExperienceEntry = {
        id: Date.now().toString(),
        user_id: "user_1",
        company_name: data.company_name,
        position: data.position,
        start_date: data.start_date,
        end_date: data.end_date,
        description: data.description || "",
      };
      setExperiences([newExperience, ...experiences]);
    }

    setIsFormOpen(false);
    setEditingExperience(null);
  };

  const handleDelete = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
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

      <div className="space-y-8">
        {/* 🧭 Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
                className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Experience
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* 📝 Form Section */}
        <AnimatePresence mode="wait">
          {isFormOpen && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ExperienceForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                initialData={
                  editingExperience
                    ? {
                        company_name: editingExperience.company_name,
                        position: editingExperience.position,
                        start_date: editingExperience.start_date,
                        end_date: editingExperience.end_date,
                        description: editingExperience.description,
                      }
                    : undefined
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 💼 Experience List */}
        {!isFormOpen && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4"
          >
            {experiences.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-pink-400/20 rounded-2xl blur opacity-30" />
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
                    className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white"
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
                  experience={experience}
                  onEdit={() => handleEdit(experience)}
                  onDelete={() => handleDelete(experience.id)}
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
