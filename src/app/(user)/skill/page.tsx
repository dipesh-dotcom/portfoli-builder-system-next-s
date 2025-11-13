"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { ThreeBackground } from "@/components/home/ThreeBackground";
import { SkillForm } from "@/components/forms/SkillForm";
import { SkillCard } from "@/components/cards/SkillCard";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";
import {
  createSkill,
  updateSkill,
  deleteSkill,
  getSkills,
} from "@/actions/skill";

type SkillEntry = {
  id: string;
  user_id: string;
  skillName: string;
  rating: number;
  created_at: string;
  updated_at: string;
};

export default function SkillPage() {
  const [skills, setSkills] = useState<SkillEntry[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillEntry | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data: any = await getSkills();
        if (data.success) setSkills(data.data);
        else toast.error(data.error || "Failed to fetch skills");
      } catch {
        toast.error("Something went wrong while fetching skills");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleSubmit = async (data: { skillName: string; rating: number }) => {
    try {
      let res: any;
      if (editingSkill) {
        res = await updateSkill(editingSkill.id, data);
        if (res.success) {
          setSkills((prev) =>
            prev.map((skill) =>
              skill.id === editingSkill.id ? res.data : skill
            )
          );
          setHighlightedId(editingSkill.id);
          toast.success("Skill updated successfully");
        } else toast.error(res.error);
      } else {
        res = await createSkill(data);
        if (res.success) {
          setSkills((prev) => [res.data, ...prev]);
          setHighlightedId(res.data.id);
          toast.success("Skill added successfully");
        } else toast.error(res.error);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsFormOpen(false);
      setEditingSkill(null);
      setTimeout(() => setHighlightedId(null), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    try {
      const res: any = await deleteSkill(id);
      if (res.success) {
        setSkills((prev) => prev.filter((skill) => skill.id !== id));
        toast.success("Skill deleted successfully");
      } else toast.error(res.error);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleEdit = (skill: SkillEntry) => {
    setEditingSkill(skill);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingSkill(null);
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
                <Star className="w-8 h-8 text-primary" />
              </div>
              Skills
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your skills and proficiency ratings
            </p>
          </div>
          {!isFormOpen && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-primary text-white font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add Skill
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Skill Form */}
        <AnimatePresence mode="wait">
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SkillForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                initialData={
                  editingSkill
                    ? {
                        skillName: editingSkill.skillName,
                        rating: editingSkill.rating,
                      }
                    : undefined
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skill List */}
        {!isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4"
          >
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin" />
              </div>
            ) : skills.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-6"
              >
                <Star className="w-16 h-16 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold text-foreground">
                  No skills added yet
                </h3>
                <p className="text-muted-foreground">
                  Start by adding your skills and ratings
                </p>
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-primary text-white font-medium shadow hover:shadow-md flex justify-center items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Add Your First Skill
                </Button>
              </motion.div>
            ) : (
              skills.map((skill, index) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onEdit={() => handleEdit(skill)}
                  onDelete={() => handleDelete(skill.id)}
                  index={index}
                  highlight={highlightedId === skill.id}
                  loading={deletingIds.has(skill.id)}
                />
              ))
            )}
          </motion.div>
        )}
      </div>
    </>
  );
}
