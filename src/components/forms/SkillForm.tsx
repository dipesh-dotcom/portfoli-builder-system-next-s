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
import { Star, Save, X } from "lucide-react";

const skillFormSchema = z.object({
  skillName: z.string().min(2, "Skill must be at least 2 characters"),
  rating: z
    .number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

interface SkillFormProps {
  onSubmit?: (data: SkillFormValues) => void;
  onCancel?: () => void;
  initialData?: Partial<SkillFormValues>;
  isLoading?: boolean;
}

export function SkillForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}: SkillFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      skillName: initialData?.skillName || "",
      rating: initialData?.rating || 1,
    },
  });

  const handleSubmit = async (data: SkillFormValues) => {
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
      <div className="relative">
        {/* Gradient removed */}
        <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {initialData ? "Edit Skill" : "Add Skill"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter your skill and proficiency rating
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
              {/* Skill Name */}
              <FormField
                control={form.control}
                name="skillName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <Star className="w-4 h-4 text-muted-foreground" />
                      Skill Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., React, Python"
                        className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rating */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <Star className="w-4 h-4 text-muted-foreground" />
                      Rating (1-5)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5"
                        min={1}
                        max={5}
                        step={0.1}
                        className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="flex-1 bg-primary text-white font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || isLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" /> Save Skill
                    </>
                  )}
                </Button>

                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting || isLoading}
                    className="flex-1 sm:flex-none bg-card border-border hover:bg-muted transition-all duration-300"
                  >
                    <X className="w-5 h-5 mr-2" /> Cancel
                  </Button>
                )}
              </div>
            </motion.form>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}
