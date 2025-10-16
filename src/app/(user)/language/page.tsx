"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { ThreeBackground } from "@/components/ThreeBackground";
import { LanguageForm } from "@/components/forms/LanguageForm";
import { LanguageCard } from "@/components/cards/LanguageCard";
import { Button } from "@/components/ui/button";
import { Plus, Globe } from "lucide-react";
import {
  createLanguage,
  updateLangugae,
  deleteLanguage,
  getLanguages,
} from "@/actions/language";

type LanguageEntry = {
  id: string;
  user_id: string;
  name: string;
  proficiency: string;
  created_at: string;
  updated_at: string;
};

export default function LanguagePage({
  initialLanguages,
}: {
  initialLanguages: LanguageEntry[];
}) {
  const [languages, setLanguages] = useState<LanguageEntry[]>(
    initialLanguages || ""
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<LanguageEntry | null>(
    null
  );
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  // Fetch language data from server on component mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data: any = await getLanguages();
        if (data.success) {
          setLanguages(data.data);
        } else {
          toast.error(data.error || "Failed to fetch language entries");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching languages");
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const handleSubmit = async (data: { name: string; proficiency: string }) => {
    try {
      let res: any;
      if (editingLanguage) {
        res = await updateLangugae(editingLanguage.id, {
          ...data,
        });
        if (res.success) {
          setLanguages((prev) =>
            prev.map((lang) =>
              lang.id === editingLanguage.id ? res.data : lang
            )
          );
          setHighlightedId(editingLanguage.id);
          toast.success("Language updated successfully");
        } else {
          toast.error(res.error);
        }
      } else {
        res = await createLanguage({
          ...data,
        });
        if (res.success) {
          setLanguages((prev) => [res.data, ...prev]);
          setHighlightedId(res.data.id);
          toast.success("Language added successfully");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsFormOpen(false);
      setEditingLanguage(null);
      setTimeout(() => setHighlightedId(null), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    try {
      const res: any = await deleteLanguage(id);
      if (res.success) {
        setLanguages((prev) => prev.filter((lang) => lang.id !== id));
        toast.success("Language deleted successfully");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
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
                        ...((
                          [
                            "Beginner",
                            "Elementary",
                            "Intermediate",
                            "Advanced",
                            "Fluent",
                            "Native",
                          ] as const
                        ).includes(editingLanguage.proficiency as any)
                          ? {
                              proficiency: editingLanguage.proficiency as
                                | "Beginner"
                                | "Elementary"
                                | "Intermediate"
                                | "Advanced"
                                | "Fluent"
                                | "Native",
                            }
                          : {}),
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
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin"></div>
              </div>
            ) : languages.length === 0 ? (
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
                  highlight={highlightedId === language.id}
                  loading={deletingIds.has(language.id)}
                />
              ))
            )}
          </motion.div>
        )}
      </div>
    </>
  );
}
