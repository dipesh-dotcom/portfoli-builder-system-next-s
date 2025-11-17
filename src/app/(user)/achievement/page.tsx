"use client";

import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { ThreeBackground } from "@/components/home/ThreeBackground";
import { AchievementForm } from "@/components/forms/AchievementForm";
import { AchievementCard } from "@/components/cards/AchievementCard";
import { Button } from "@/components/ui/button";
import { Plus, Trophy } from "lucide-react";
import {
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getAchievements,
} from "@/actions/achievement";
import Loader from "@/components/loader/Loader";
import ConfirmDialog from "@/components/cards/ConformationDialog";

type AchievementEntry = {
  id: string;
  user_id: string;
  title: string;
  issuer: string;
  dateObtained: string;
  created_at: string;
  updated_at: string;
};

export default function AchievementPage() {
  const [achievements, setAchievements] = useState<AchievementEntry[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] =
    useState<AchievementEntry | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  // Fetch achievements on mount
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data: any = await getAchievements();
        if (data.success) {
          setAchievements(data.data);
        } else {
          toast.error(data.error || "Failed to fetch achievements");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching achievements");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const handleSubmit = async (data: {
    title: string;
    issuer: string;
    dateObtained: string;
  }) => {
    try {
      let res: any;
      if (editingAchievement) {
        res = await updateAchievement(editingAchievement.id, {
          ...data,
          dateObtained: new Date().toISOString().split("T")[0],
        });
        if (res.success) {
          setAchievements((prev) =>
            prev.map((ach) =>
              ach.id === editingAchievement.id ? res.data : ach
            )
          );
          setHighlightedId(editingAchievement.id);
          toast.success("Achievement updated successfully");
        } else {
          toast.error(res.error);
        }
      } else {
        res = await createAchievement({
          ...data,
          dateObtained: new Date().toISOString().split("T")[0],
        });
        if (res.success) {
          setAchievements((prev) => [res.data, ...prev]);
          setHighlightedId(res.data.id);
          toast.success("Achievement added successfully");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsFormOpen(false);
      setEditingAchievement(null);
      setTimeout(() => setHighlightedId(null), 3000);
    }
  };

  const openDeleteConfirm = (id: string) => {
    setSelectedDeleteId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;
    setDeletingIds((prev) => new Set(prev).add(selectedDeleteId));
    try {
      const res: any = await deleteAchievement(selectedDeleteId);
      if (res.success) {
        setAchievements((prev) =>
          prev.filter((ach) => ach.id !== selectedDeleteId)
        );
        toast.success("Achievement deleted successfully");
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
                className="bg-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
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
                        dateObtained: editingAchievement.dateObtained,
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
              <Loader size="lg" />
            ) : achievements.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
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
                    className="bg-primary text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Your First Achievement
                  </Button>
                </div>
              </motion.div>
            ) : (
              achievements.map((achievement, index) => (
                <Suspense key={achievement.id} fallback={<Loader />}>
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    onEdit={() => handleEdit(achievement)}
                    onDelete={() => openDeleteConfirm(achievement.id)}
                    index={index}
                    highlight={highlightedId === achievement.id}
                    loading={deletingIds.has(achievement.id)}
                  />
                </Suspense>
              ))
            )}
          </motion.div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Delete Achievement"
        message="Are you sure you want to delete this achievement? This action cannot be undone."
        onConfirm={confirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
