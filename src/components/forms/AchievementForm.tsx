"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Calendar,
  GraduationCap,
  Save,
  X,
  Trophy,
  Building2,
} from "lucide-react";

const achievementFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  issuer: z.string().min(2, "Issuer must be at least 2 characters"),
  date_obtained: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be a valid date (YYYY-MM-DD)"),
});

type AchievementFormValues = z.infer<typeof achievementFormSchema>;

interface AchievementFormProps {
  onSubmit?: (data: AchievementFormValues) => void;
  onCancel?: () => void;
  initialData?: Partial<AchievementFormValues>;
  isLoading?: boolean;
}

export function AchievementForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}: AchievementFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      issuer: initialData?.issuer || "",
      date_obtained: initialData?.date_obtained || "",
    },
  });

  const handleSubmit = async (data: AchievementFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit?.(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

        <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {initialData ? "Edit Achievement" : "Add Achievement"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Fill in your achievement details
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
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Best Student Award"
                        className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Issuer */}
              <FormField
                control={form.control}
                name="issuer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      Issuer
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Stanford University"
                        className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Obtained */}
              <FormField
                control={form.control}
                name="date_obtained"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Date Obtained
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 pt-4"
              >
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-pink-400 hover:from-indigo-600 hover:to-pink-500 text-white font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting || isLoading ? "Saving..." : "Save Achievement"}
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
      </div>
    </motion.div>
  );
}
