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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, Building2, Calendar, Save, X } from "lucide-react";

const educationFormSchema = z
  .object({
    institute_name: z
      .string()
      .min(2, "Institute must be at least 2 characters"),
    degree: z.string().min(2, "Degree is required"),
    start_year: z
      .string()
      .regex(/^\d{4}$/, "Must be a valid year")
      .refine((year) => {
        const y = Number.parseInt(year);
        return y >= 1950 && y <= new Date().getFullYear() + 10;
      }, "Year must be between 1950 and 10 years from now"),
    end_year: z
      .string()
      .regex(/^\d{4}$/, "Must be a valid year")
      .refine((year) => {
        const y = Number.parseInt(year);
        return y >= 1950 && y <= new Date().getFullYear() + 10;
      }, "Year must be between 1950 and 10 years from now"),
  })
  .refine(
    (date) =>
      Number.parseInt(date.end_year) >= Number.parseInt(date.start_year),
    {
      message: "End year must be after or equal to start year",
      path: ["end_year"],
    }
  );

type EducationFormValues = z.infer<typeof educationFormSchema>;

interface EducationFormProps {
  onSubmit?: (data: EducationFormValues) => void;
  onCancel?: () => void;
  initialData?: Partial<EducationFormValues>;
  isLoading?: boolean;
}

export function EducationForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}: EducationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      institute_name: initialData?.institute_name || "",
      degree: initialData?.degree || "",
      start_year: initialData?.start_year || "",
      end_year: initialData?.end_year || "",
    },
  });

  const handleSubmit = async (data: EducationFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit?.(data);
    } finally {
      setIsSubmitting(false);
    }
  };
  const degreeTypes = [
    "High School Diploma",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree (PhD)",
    "Professional Degree",
    "Certificate",
    "Diploma",
    "Other",
  ];

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
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {initialData ? "Edit Education" : "Add Education"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Fill in your educational background details
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
              <FormField
                control={form.control}
                name="institute_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      Institute Name
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

              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      Degree
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-muted/30 border-border text-foreground focus:border-primary focus:ring-primary/20">
                          <SelectValue placeholder="Select your degree" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {degreeTypes.map((degree) => (
                          <SelectItem key={degree} value={degree}>
                            {degree}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="start_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        Start Year
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2020"
                          min="1950"
                          max={new Date().getFullYear() + 10}
                          className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        End Year
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2024"
                          min="1950"
                          max={new Date().getFullYear() + 10}
                          className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                  {isSubmitting || isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Save className="w-5 h-5 mr-2" />
                      Save Education
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
      </div>
    </motion.div>
  );
}
