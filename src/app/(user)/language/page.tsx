"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeBackground } from "@/components/ThreeBackground";
import { LanguageForm } from "@/components/forms/LanguageForm";
import { LanguageCard } from "@/components/cards/LanguageCard";
import { Button } from "@/components/ui/button";
import { Plus, Globe } from "lucide-react";

type LanguageEntry = {
  id: string;
  user_id: string;
  name: string;
  proficiency: string;
  created_at: string;
  updated_at: string;
};

export default async function LanguagePage() {
  const [languages, setLanguages] = useState<LanguageEntry[]>([
    {
      id: "1",
      user_id: "user_1",
      name: "English",
      proficiency: "Native",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user_1",
      name: "Spanish",
      proficiency: "Intermediate",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<LanguageEntry | null>(
    null
  );

  const handleSubmit = (data: { name: string; proficiency: string }) => {
    if (editingLanguage) {
      setLanguages(
        languages.map((lang) =>
          lang.id === editingLanguage.id
            ? { ...lang, ...data, updated_at: new Date().toISOString() }
            : lang
        )
      );
    } else {
      const newLanguage: LanguageEntry = {
        id: Date.now().toString(),
        user_id: "user_1",
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setLanguages([newLanguage, ...languages]);
    }
    setIsFormOpen(false);
    setEditingLanguage(null);
  };

  const handleDelete = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const handleEdit = (language: LanguageEntry) => {
    setEditingLanguage(language);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingLanguage(null);
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
                <Globe className="w-8 h-8 text-primary" />
              </div>
              Languages
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your language skills and proficiency
            </p>
          </div>
          {!isFormOpen && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Language
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
              <LanguageForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                initialData={
                  editingLanguage
                    ? {
                        name: editingLanguage.name,
                        proficiency: editingLanguage.proficiency,
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
            {languages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-pink-400/20 rounded-2xl blur opacity-30" />
                <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-12 text-center">
                  <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No languages added yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start by adding your language skills
                  </p>
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Your First Language
                  </Button>
                </div>
              </motion.div>
            ) : (
              languages.map((language, index) => (
                <LanguageCard
                  key={language.id}
                  language={language}
                  onEdit={() => handleEdit(language)}
                  onDelete={() => handleDelete(language.id)}
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
