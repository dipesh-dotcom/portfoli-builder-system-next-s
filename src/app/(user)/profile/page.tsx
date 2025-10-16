"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeBackground } from "@/components/ThreeBackground";
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
  Check,
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

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
    { label: "Projects", value: "24", color: "from-indigo-500 to-blue-500" },
    { label: "Education", value: "3", color: "from-pink-400 to-rose-400" },
    { label: "Skills", value: "18", color: "from-purple-500 to-indigo-500" },
  ];

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
                className="bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Edit className="w-5 h-5 mr-2" />
                Edit Profile
              </Button>
            </motion.div>
          )}
        </motion.div>

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
            <motion.div
              className="relative group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-pink-400 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-700 animate-gradient-xy" />

              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
                  }}
                />
              )}

              <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                <div className="relative p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <div className="relative group/avatar">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-400 rounded-full blur opacity-50 group-hover/avatar:opacity-75 transition duration-500" />
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-card">
                          <img
                            src={profile.avatar_url || "/placeholder.svg"}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                          />
                          <motion.div
                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Camera className="w-8 h-8 text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <motion.h2
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-2xl md:text-3xl font-bold text-foreground"
                        >
                          {profile.name}
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="text-muted-foreground mt-1"
                        >
                          {profile.bio}
                        </motion.p>
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      >
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
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-pink-400/20 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                  <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {stat.label}
                        </p>
                        <motion.p
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.8 + index * 0.1,
                            type: "spring",
                          }}
                          className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                        >
                          {stat.value}
                        </motion.p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg opacity-20`}
                      >
                        <Check className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
