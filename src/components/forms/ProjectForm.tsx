"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectData } from "@/types/user/projectTypes";
import { projectFormSchema } from "@/validations/user/projectValidations";
import { uploadcare } from "@/lib/uploadCare";
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
import Image from "next/image";

interface ProjectFormProps {
  onSubmit?: (data: ProjectData) => void;
  onCancel?: () => void;
  initialData?: Partial<ProjectData>;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!initialData?.preview_image) return;
    setPreviewUrl(initialData.preview_image);
  }, [initialData?.preview_image]);

  const form = useForm<ProjectData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      github_url: initialData?.github_url || "",
      demo_url: initialData?.demo_url || "",
      preview_image: initialData?.preview_image || "",
    },
  });

  // Store file locally on selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (data: ProjectData) => {
    setIsSubmitting(true);

    try {
      // If a new file is selected, upload it now
      if (selectedFile) {
        const uploaded = await uploadcare.uploadFile(selectedFile);
        // Extract UUID and replace with custom CDN
        const uuid = uploaded.cdnUrl.split("/").filter(Boolean).pop();
        const filename = selectedFile.name; // Original file name
        data.preview_image = `https://1ktfvxwijd.ucarecd.net/${uuid}/${filename}`;

        setPreviewUrl(data.preview_image);
      }

      await onSubmit?.(data);
    } catch (error) {
      console.error("Error uploading image or submitting form:", error);
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
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground flex items-center gap-2">
                    <Code className="w-4 h-4 text-muted-foreground" /> Project
                    Title
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
                    <Code className="w-4 h-4 text-muted-foreground" />{" "}
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
                    <Code className="w-4 h-4 text-muted-foreground" /> GitHub
                    URL
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
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />{" "}
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
              render={() => (
                <FormItem>
                  <FormLabel className="text-foreground flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" />{" "}
                    Preview Image
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="bg-muted/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={50}
                      height={50}
                      className="mt-2 w-full max-h-60 object-cover rounded-lg border border-border"
                    />
                  )}
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
                  className="flex-1 sm:flex-none bg-card border-border hover:bg-muted transition-all duration-300"
                >
                  <X className="w-5 h-5 mr-2" /> Cancel
                </Button>
              )}
            </div>
          </motion.form>
        </Form>
      </div>
    </motion.div>
  );
}
