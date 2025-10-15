"use client";

import { useState, useEffect } from "react";
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
import { Save, X, Code, ExternalLink, ImageIcon } from "lucide-react";

const projectFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  github_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  demo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  preview_image: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file ||
        (file instanceof File &&
          ["image/jpeg", "image/png", "image/webp"].includes(file.type)),
      "Only JPG, PNG, or WEBP images are allowed"
    ),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  onSubmit?: (data: ProjectFormValues) => void;
  onCancel?: () => void;
  initialData?: Partial<ProjectFormValues>;
  isLoading?: boolean;
}

export function ProjectForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle initial preview URL from string or File
  useEffect(() => {
    if (!initialData?.preview_image) return;

    if (typeof initialData.preview_image === "string") {
      setPreviewUrl(initialData.preview_image);
    } else if (initialData.preview_image instanceof File) {
      setPreviewUrl(URL.createObjectURL(initialData.preview_image));
    }
  }, [initialData?.preview_image]);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      github_url: initialData?.github_url || "",
      demo_url: initialData?.demo_url || "",
      preview_image: initialData?.preview_image || null,
    },
  });

  const handleSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit?.(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      form.setValue("preview_image", file); // Update react-hook-form value
    } else {
      setPreviewUrl(null);
      form.setValue("preview_image", null);
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
              <Code className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {initialData ? "Edit Project" : "Add Project"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Fill in your project details
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
              {/* Project Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <Code className="w-4 h-4 text-muted-foreground" />
                      Project Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="My Awesome Project"
                        className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <Code className="w-4 h-4 text-muted-foreground" />
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project..."
                        className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* GitHub URL */}
              <FormField
                control={form.control}
                name="github_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <Code className="w-4 h-4 text-muted-foreground" />
                      GitHub URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/project"
                        className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Demo URL */}
              <FormField
                control={form.control}
                name="demo_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      Demo URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://demo.com/project"
                        className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preview Image */}
              <FormField
                control={form.control}
                name="preview_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-muted-foreground" />
                      Preview Image
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mt-2 w-full max-h-60 object-cover rounded-lg border border-border"
                      />
                    )}
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
                  {isSubmitting || isLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" /> Save Project
                    </>
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
