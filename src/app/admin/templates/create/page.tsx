"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TemplateCategory } from "@/types/template/templateTypes";
import { createTemplateAction, getCategoriesAction } from "@/actions/templates";
import { FileUpload } from "@/components/admin/template/FileUpload";
import { CodeEditor } from "@/components/admin/template/CodeEditor";

export default function CreateTemplatePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    thumbnail: "",
    code: `export default function MyTemplate() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="text-gray-600">Customize this template</p>
    </div>
  );
}`,
  });

  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategoriesAction();
        setCategories(data);
      } catch (err) {
        console.error("[v0] Error loading categories:", err);
        setError("Failed to load categories");
      }
    };

    loadCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCodeChange = (code: string) => {
    setFormData((prev) => ({ ...prev, code }));
  };

  const handleTemplateUpload = async (file: File) => {
    const content = await file.text();
    setFormData((prev) => ({ ...prev, code: content }));
    setUploadedFileName(file.name);
  };

  const handleThumbnailUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setThumbnailPreview(preview);
      setFormData((prev) => ({ ...prev, thumbnail: preview }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.categoryId || !formData.code) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      await createTemplateAction({
        name: formData.name,
        description: formData.description,
        categoryId: formData.categoryId,
        thumbnail: formData.thumbnail,
        code: formData.code,
      });
      router.push("/admin/templates");
    } catch (err) {
      console.error("[v0] Error creating template:", err);
      setError(
        err instanceof Error ? err.message : "Failed to create template"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/admin/templates"
            className="text-primary hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">Create Template</h1>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Minimal Dark"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your template..."
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Thumbnail Image
                </label>
                <FileUpload
                  onFileSelect={handleThumbnailUpload}
                  accept=".jpg,.jpeg,.png,.gif"
                  label="Upload Thumbnail"
                />
                {thumbnailPreview && (
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      Preview:
                    </p>
                    <img
                      src={thumbnailPreview || "/placeholder.svg"}
                      alt="Thumbnail preview"
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Code Upload */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Template Code
              </label>
              <FileUpload
                onFileSelect={handleTemplateUpload}
                accept=".tsx,.jsx"
                label="Upload React Component"
              />
              {uploadedFileName && (
                <p className="text-xs text-green-600 mt-2">
                  ✓ Uploaded: {uploadedFileName}
                </p>
              )}
            </div>
          </div>

          {/* Code Editor */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Edit Component Code
            </label>
            <CodeEditor
              value={formData.code}
              onChange={handleCodeChange}
              placeholder="Write your React functional component here..."
            />
            <p className="text-xs text-muted-foreground mt-2">
              Must be a React functional component with a default export
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-border">
            <Link
              href="/admin"
              className="px-6 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold disabled:opacity-50"
            >
              {isSaving ? "Creating..." : "Create Template"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
