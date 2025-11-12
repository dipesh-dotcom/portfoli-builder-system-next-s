"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeBackground } from "@/components/home/ThreeBackground";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { Button } from "@/components/ui/button";
import {
  UserCircle,
  Edit,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  Camera,
} from "lucide-react";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  occupation: string;
  joined_date: string;
  avatar_url: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    id: "user_1",
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Full-stack developer passionate about creating beautiful and functional web applications.",
    location: "San Francisco, CA",
    occupation: "Senior Software Engineer",
    joined_date: "2023-01-15",
    avatar_url: "/professional-avatar.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (data: {
    name: string;
    email: string;
    bio: string;
    location: string;
    occupation: string;
  }) => {
    setProfile({ ...profile, ...data });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const stats = [
    { label: "Projects", value: "24" },
    { label: "Education", value: "3" },
    { label: "Skills", value: "18" },
  ];

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
                  name: profile.name,
                  email: profile.email,
                  bio: profile.bio,
                  location: profile.location,
                  occupation: profile.occupation,
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
            {/* Profile Card */}
            <div className="relative bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-card">
                  <img
                    src={profile.avatar_url || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer bg-black/30 rounded-full">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      {profile.name}
                    </h2>
                    <p className="text-muted-foreground mt-1">{profile.bio}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">
                        {profile.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="p-1.5 bg-secondary/10 rounded-lg">
                        <MapPin className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-muted-foreground">
                        {profile.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
                        <Briefcase className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">
                        {profile.occupation}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="p-1.5 bg-secondary/10 rounded-lg">
                        <Calendar className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-muted-foreground">
                        Joined{" "}
                        {new Date(profile.joined_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="relative bg-card border border-border rounded-xl p-6"
                >
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
