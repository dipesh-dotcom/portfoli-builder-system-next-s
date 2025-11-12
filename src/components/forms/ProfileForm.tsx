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

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.occupation.trim())
      newErrors.occupation = "Occupation is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative"
    >
      {/* Gradient removed */}
      <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl overflow-hidden p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: "name", label: "Full Name", placeholder: "John Doe" },
              {
                id: "email",
                label: "Email Address",
                placeholder: "john@example.com",
                type: "email",
              },
              {
                id: "location",
                label: "Location",
                placeholder: "San Francisco, CA",
              },
              {
                id: "occupation",
                label: "Occupation",
                placeholder: "Software Engineer",
              },
            ].map(({ id, label, placeholder, type }) => (
              <div key={id} className="space-y-2">
                <Label
                  htmlFor={id}
                  className="text-sm font-medium text-foreground"
                >
                  {label}
                </Label>
                <Input
                  id={id}
                  type={type || "text"}
                  value={formData[id as keyof ProfileFormValues]}
                  onChange={(e) =>
                    handleChange(id as keyof ProfileFormValues, e.target.value)
                  }
                  placeholder={placeholder}
                  className="bg-background/50 border-border focus:border-primary transition-colors"
                />
                {errors[id as keyof ProfileFormValues] && (
                  <p className="text-xs text-destructive">
                    {errors[id as keyof ProfileFormValues]}
                  </p>
                )}
              </div>
            ))}
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
                className="w-full bg-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
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
