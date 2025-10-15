"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeBackground } from "@/components/ThreeBackground";
import { SkillForm } from "@/components/forms/SkillForm";
import { SkillCard } from "@/components/cards/SkillCard";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";

type SkillEntry = {
  id: string;
  user_id: string;
  skill_name: string;
  rating: number;
  created_at: string;
  updated_at: string;
};

export default async function SkillPage() {
  const [skills, setSkills] = useState<SkillEntry[]>([
    {
      id: "1",
      user_id: "user_1",
      skill_name: "React",
      rating: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user_1",
      skill_name: "Python",
      rating: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillEntry | null>(null);

  const handleSubmit = (data: { skill_name: string; rating: number }) => {
    if (editingSkill) {
      setSkills(
        skills.map((skill) =>
          skill.id === editingSkill.id
            ? { ...skill, ...data, updated_at: new Date().toISOString() }
            : skill
        )
      );
    } else {
      const newSkill: SkillEntry = {
        id: Date.now().toString(),
        user_id: "user_1",
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setSkills([newSkill, ...skills]);
    }
    setIsFormOpen(false);
    setEditingSkill(null);
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
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
                className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Skill
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
              <SkillForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                initialData={
                  editingSkill
                    ? {
                        skill_name: editingSkill.skill_name,
                        rating: editingSkill.rating,
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
            {skills.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-pink-400/20 rounded-2xl blur opacity-30" />
                <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-12 text-center">
                  <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No skills added yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start by adding your skills and ratings
                  </p>
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Your First Skill
                  </Button>
                </div>
              </motion.div>
            ) : (
              skills.map((skill, index) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onEdit={() => handleEdit(skill)}
                  onDelete={() => handleDelete(skill.id)}
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
