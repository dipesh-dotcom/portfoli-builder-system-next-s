"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Save, X, UserCircle, Mail, MapPin, Briefcase } from "lucide-react";

const profileFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  bio: z.string().min(1, "Bio is required"),
  location: z.string().min(1, "Location is required"),
  occupation: z.string().min(1, "Occupation is required"),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  onSubmit: (data: ProfileFormValues) => void;
  onCancel: () => void;
  initialData?: Partial<ProfileFormValues>;
  isLoading?: boolean;
}

export function ProfileForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      bio: initialData?.bio || "",
      location: initialData?.location || "",
      occupation: initialData?.occupation || "",
    },
  });

  const handleSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {initialData ? "Edit Profile" : "Add Profile"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Update your personal information and preferences
            </p>
          </div>
        </motion.div>

        <Form {...form}>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {["name", "email", "location", "occupation"].map((field) => {
              const labelIcons: Record<string, JSX.Element> = {
                name: <UserCircle className="w-4 h-4 text-muted-foreground" />,
                email: <Mail className="w-4 h-4 text-muted-foreground" />,
                location: <MapPin className="w-4 h-4 text-muted-foreground" />,
                occupation: (
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                ),
              };
              return (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as keyof ProfileFormValues}
                  render={({ field: f }) => (
                    <FormItem>
                      <FormLabel className="text-foreground flex items-center gap-2">
                        {labelIcons[field]}{" "}
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Enter your ${field}`}
                          className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                          {...f}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}

            <FormField
              control={form.control}
              name="bio"
              render={({ field: f }) => (
                <FormItem>
                  <FormLabel className="text-foreground flex items-center gap-2">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 resize-none"
                      {...f}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="flex-1 bg-primary text-white font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting || isLoading ? (
                  "Saving..."
                ) : (
                  <span className="flex items-center justify-center">
                    <Save className="w-5 h-5 mr-2" /> Save Changes
                  </span>
                )}
              </Button>

              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting || isLoading}
                  className="flex-1 sm:flex-none bg-card border-border hover:bg-muted hover:border-destructive/30 text-foreground transition-all duration-300 hover:scale-[1.02]"
                >
                  <X className="w-5 h-5 mr-2" />
                  Cancel
                </Button>
              )}
            </motion.div>
          </motion.form>
        </Form>
      </div>
    </motion.div>
  );
}
