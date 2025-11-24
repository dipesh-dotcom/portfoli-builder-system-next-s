"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Template, TemplateCategory } from "@/types/template/templateTypes";
import {
  getCategoriesAction,
  getTemplateByIdAction,
  updateTemplateAction,
} from "@/actions/templates";
import { FileUpload } from "@/components/admin/template/FileUpload";
import { CodeEditor } from "@/components/admin/template/CodeEditor";

export default function EditTemplatePage() {
  const { id } = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    thumbnail: "",
    code: "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [templateData, categoriesData] = await Promise.all([
          getTemplateByIdAction(id as string),
          getCategoriesAction(),
        ]);

        if (templateData) {
          setTemplate(templateData);
          setFormData({
            name: templateData.name,
            description: templateData.description,
            categoryId: templateData.categoryId,
            thumbnail: templateData.thumbnail ?? "",
            code: templateData.code,
          });
          setThumbnailPreview(templateData.thumbnail ?? "");
        }
        setCategories(categoriesData);
      } catch (err) {
        console.error("[v0] Error loading template:", err);
        setError("Failed to load template");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

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

  const handleThumbnailUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setThumbnailPreview(preview);
      setFormData((prev) => ({ ...prev, thumbnail: preview }));
    };
    reader.readAsDataURL(file);
  };

  const handleTemplateUpload = async (file: File) => {
    const content = await file.text();
    setFormData((prev) => ({ ...prev, code: content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!template) return;

    try {
      setIsSaving(true);
      setError(null);
      await updateTemplateAction(template.id, {
        name: formData.name,
        description: formData.description,
        categoryId: formData.categoryId,
        thumbnail: formData.thumbnail,
        code: formData.code,
      });
      router.push("/admin/templates");
    } catch (err) {
      console.error("[v0] Error updating template:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update template"
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">Loading template...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Template not found</h1>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <Link
            href="/admin/templates"
            className="text-primary hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/admin" className="text-primary hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">Edit Template</h1>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  required
                />
              </div>

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

              <div>
                <label className="block text-sm font-semibold mb-3">
                  Thumbnail Image
                </label>
                <FileUpload
                  onFileSelect={handleThumbnailUpload}
                  accept=".jpg,.jpeg,.png,.gif"
                  label="Update Thumbnail"
                />
                {thumbnailPreview && (
                  <div className="mt-4">
                    <img
                      src={thumbnailPreview || "/placeholder.svg"}
                      alt="Thumbnail preview"
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Template Code
              </label>
              <FileUpload
                onFileSelect={handleTemplateUpload}
                accept=".tsx,.jsx"
                label="Upload React Component"
              />
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
              placeholder="Edit your React component..."
            />
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
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
