"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeBackground } from "@/components/ThreeBackground";
import { AchievementForm } from "@/components/forms/AchievementForm";
import { AchievementCard } from "@/components/cards/AchievementCard";
import { Button } from "@/components/ui/button";
import { Plus, Trophy } from "lucide-react";

type AchievementEntry = {
  id: string;
  user_id: string;
  title: string;
  issuer: string;
  date_obtained: string;
  created_at: string;
  updated_at: string;
};

export default async function AchievementPage() {
  const [achievements, setAchievements] = useState<AchievementEntry[]>([
    {
      id: "1",
      user_id: "user_1",
      title: "Best Student Award",
      issuer: "Stanford University",
      date_obtained: "2022-05-15",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user_1",
      title: "Research Excellence",
      issuer: "MIT",
      date_obtained: "2020-08-20",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] =
    useState<AchievementEntry | null>(null);

  const handleSubmit = (data: {
    title: string;
    issuer: string;
    date_obtained: string;
  }) => {
    if (editingAchievement) {
      // Update existing achievement
      setAchievements(
        achievements.map((ach) =>
          ach.id === editingAchievement.id
            ? { ...ach, ...data, updated_at: new Date().toISOString() }
            : ach
        )
      );
    } else {
      // Add new achievement
      const newAchievement: AchievementEntry = {
        id: Date.now().toString(),
        user_id: "user_1",
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setAchievements([newAchievement, ...achievements]);
    }
    setIsFormOpen(false);
    setEditingAchievement(null);
  };

  const handleDelete = (id: string) => {
    setAchievements(achievements.filter((ach) => ach.id !== id));
  };

  const handleEdit = (achievement: AchievementEntry) => {
    setEditingAchievement(achievement);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingAchievement(null);
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
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              Achievements
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your achievements and awards
            </p>
          </div>
          {!isFormOpen && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Achievement
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
              <AchievementForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                initialData={
                  editingAchievement
                    ? {
                        title: editingAchievement.title,
                        issuer: editingAchievement.issuer,
                        date_obtained: editingAchievement.date_obtained,
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
            {achievements.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-pink-400/20 rounded-2xl blur opacity-30" />
                <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-12 text-center">
                  <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No achievements yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start by adding your achievements
                  </p>
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Your First Achievement
                  </Button>
                </div>
              </motion.div>
            ) : (
              achievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  onEdit={() => handleEdit(achievement)}
                  onDelete={() => handleDelete(achievement.id)}
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
