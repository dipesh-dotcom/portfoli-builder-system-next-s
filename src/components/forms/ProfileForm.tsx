"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, X } from "lucide-react";

type ProfileFormProps = {
  onSubmit: (data: ProfileFormValues) => void;
  onCancel: () => void;
  initialData?: Partial<ProfileFormValues>;
  isLoading?: boolean;
};

export type ProfileFormValues = {
  name: string;
  email: string;
  bio: string;
  location: string;
  occupation: string;
};

export function ProfileForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormValues>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    bio: initialData?.bio || "",
    location: initialData?.location || "",
    occupation: initialData?.occupation || "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProfileFormValues, string>>
  >({});

  const handleChange = (field: keyof ProfileFormValues, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProfileFormValues, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.occupation.trim()) {
      newErrors.occupation = "Occupation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-pink-400 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500 animate-gradient-xy" />

      <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="John Doe"
                className="bg-background/50 border-border focus:border-primary transition-colors"
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john@example.com"
                className="bg-background/50 border-border focus:border-primary transition-colors"
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="location"
                className="text-sm font-medium text-foreground"
              >
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="San Francisco, CA"
                className="bg-background/50 border-border focus:border-primary transition-colors"
              />
              {errors.location && (
                <p className="text-xs text-destructive">{errors.location}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="occupation"
                className="text-sm font-medium text-foreground"
              >
                Occupation
              </Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => handleChange("occupation", e.target.value)}
                placeholder="Software Engineer"
                className="bg-background/50 border-border focus:border-primary transition-colors"
              />
              {errors.occupation && (
                <p className="text-xs text-destructive">{errors.occupation}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="bio"
              className="text-sm font-medium text-foreground"
            >
              Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
              className="bg-background/50 border-border focus:border-primary transition-colors resize-none"
            />
            {errors.bio && (
              <p className="text-xs text-destructive">{errors.bio}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="w-full border-border hover:bg-muted transition-colors bg-transparent"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
