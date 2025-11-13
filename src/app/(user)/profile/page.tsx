"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeBackground } from "@/components/home/ThreeBackground";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { Button } from "@/components/ui/button";
import { UserCircle, Edit } from "lucide-react";
import { ProfileCard } from "@/components/cards/ProfileCard";
import {
  getProfile,
  getProfileStats,
  updateProfile,
  uploadAvater,
} from "@/actions/profile";
import toast from "react-hot-toast";
import { uploadcare } from "@/lib/uploadCare";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ projects: 0, education: 0, skills: 0 });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        if (res.success) {
          setProfile(res.data);
        } else {
          console.error(res.error);
        }

        const statsRes = await getProfileStats();
        if (statsRes.success && statsRes.data) setStats(statsRes.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (data: any) => {
    const res = await updateProfile(data);
    if (res.success) {
      toast.success("Profile updated successfully.");
      setProfile({ ...profile, ...data });
      setIsEditing(false);
    } else {
      toast.error(res.error ?? "Error updating profile");
      console.error(res.error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleAvatarClick = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;

        const toastId = toast.loading("Uploading avatar...");
        try {
          const uploaded = await uploadcare.uploadFile(file);
          // Extract UUID and replace with custom CDN
          const uuid = uploaded.cdnUrl.split("/").filter(Boolean).pop();
          const filename = file.name; // Original file name
          const url = `https://1ktfvxwijd.ucarecd.net/${uuid}/${filename}`;
          const res = await uploadAvater(url);
          if (res.success) {
            setProfile({ ...profile, avatar_url: url });
            toast.success("Avatar updated!", { id: toastId });
          } else {
            toast.error(res.error ?? "Failed to update avatar", {
              id: toastId,
            });
          }
        } catch (error) {
          console.error(error);
          toast.error("Error uploading avatar", { id: toastId });
        }
      };
      input.click();
    } catch (error) {
      console.error(error);
    }
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
                <UserCircle className="w-8 h-8 text-primary" />
              </div>
              Profile
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your personal information and preferences
            </p>
          </div>

          {!isEditing && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Edit className="w-5 h-5 mr-2" />
                Edit Profile
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                initialData={{
                  name: profile?.name,
                  email: profile?.email,
                  bio: profile?.bio,
                  location: profile?.location,
                  occupation: profile?.occupation,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* Profile Card */}
                <ProfileCard
                  profile={profile}
                  onAvatarClick={handleAvatarClick}
                />

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Object.entries(stats).map(([key, value]) => (
                    <div
                      key={key}
                      className="relative bg-card border border-border rounded-xl p-6"
                    >
                      <p className="text-sm text-muted-foreground mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
}
