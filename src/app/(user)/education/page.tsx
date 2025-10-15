"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeBackground } from "@/components/ThreeBackground";
import { EducationForm } from "@/components/forms/EducationForm";
import { EducationCard } from "@/components/cards/EducationCard";
import { Button } from "@/components/ui/button";
import { Plus, GraduationCap } from "lucide-react";

type EducationEntry = {
  id: string;
  user_id: string;
  institute_name: string;
  degree: string;
  start_year: string;
  end_year: string;
  created_at: string;
  updated_at: string;
};

export default function EducationPage() {
  const [educations, setEducations] = useState<EducationEntry[]>([
    {
      id: "1",
      user_id: "user_1",
      institute_name: "Stanford University",
      degree: "Master's Degree",
      start_year: "2020",
      end_year: "2022",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user_1",
      institute_name: "MIT",
      degree: "Bachelor's Degree",
      start_year: "2016",
      end_year: "2020",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEducation, setEditingEducation] =
    useState<EducationEntry | null>(null);

  const handleSubmit = (data: {
    institute_name: string;
    degree: string;
    start_year: string;
    end_year: string;
  }) => {
    if (editingEducation) {
      // Update existing education
      setEducations(
        educations.map((edu) =>
          edu.id === editingEducation.id
            ? { ...edu, ...data, updated_at: new Date().toISOString() }
            : edu
        )
      );
    } else {
      // Add new education
      const newEducation: EducationEntry = {
        id: Date.now().toString(),
        user_id: "user_1",
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setEducations([newEducation, ...educations]);
    }
    setIsFormOpen(false);
    setEditingEducation(null);
  };

  const handleDelete = (id: string) => {
    setEducations(educations.filter((edu) => edu.id !== id));
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
                className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Education
              </Button>
            </motion.div>
          )}
        </motion.div>

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
                        institute_name: editingEducation.institute_name,
                        degree: editingEducation.degree,
                        start_year: editingEducation.start_year,
                        end_year: editingEducation.end_year,
                      }
                    : undefined
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4"
          >
            {educations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-pink-400/20 rounded-2xl blur opacity-30" />
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
                    className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white"
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
                  education={education}
                  onEdit={() => handleEdit(education)}
                  onDelete={() => handleDelete(education.id)}
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
