"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeForm } from "@/components/forms/ResumeForm";
import { ResumeCard } from "@/components/cards/ResumeCard";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

type Resume = {
  id: string;
  resume_file: string;
  created_at: string;
};

export default function ResumePage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (file: File) => {
    if (editingResume) {
      // Update existing resume
      setResumes((prev) =>
        prev.map((r) =>
          r.id === editingResume.id
            ? { ...r, resume_file: URL.createObjectURL(file) }
            : r
        )
      );
    } else {
      // Add new resume
      const newResume: Resume = {
        id: Date.now().toString(),
        resume_file: URL.createObjectURL(file),
        created_at: new Date().toISOString(),
      };
      setResumes([newResume, ...resumes]);
    }
    setIsFormOpen(false);
    setEditingResume(null);
  };

  const handleEdit = (resume: Resume) => {
    setEditingResume(resume);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingResume(null);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Resumes</h1>
        </div>

        {!isFormOpen && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Upload Resume
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
            <ResumeForm
              onSubmit={handleSubmit}
              initialData={
                editingResume
                  ? { resume_file: editingResume.resume_file }
                  : undefined
              }
              onCancel={handleCancel}
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
          {resumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-pink-400/20 rounded-2xl blur opacity-30" />
              <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No resumes uploaded yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start by uploading your resume
                </p>
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Upload Your First Resume
                </Button>
              </div>
            </motion.div>
          ) : (
            resumes.map((resume, index) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                index={index}
                onEdit={() => handleEdit(resume)}
                onDelete={() => handleDelete(resume.id)}
              />
            ))
          )}
        </motion.div>
      )}
    </div>
  );
}
