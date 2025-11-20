"use client";

import type React from "react";

import { useState } from "react";
import { MOCK_TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/mock-data";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FileUpload } from "@/components/admin/template/FileUpload";
import { CodeEditor } from "@/components/admin/template/CodeEditor";

export default function EditTemplatePage() {
  const { id } = useParams();
  const template = MOCK_TEMPLATES.find((t) => t.id === id);

  const [formData, setFormData] = useState({
    name: template?.name || "",
    description: template?.description || "",
    category: template?.category || "",
    thumbnail: template?.thumbnail || "",
    code: template?.code || "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string>(
    template?.thumbnail || ""
  );
  const [isSaving, setIsSaving] = useState(false);

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
    setIsSaving(true);
    console.log("Updating template:", formData);
    // TODO: Implement template update with API call
    setIsSaving(false);
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Template not found</h1>
          <Link href="/admin" className="text-primary hover:underline">
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
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  required
                >
                  <option value="">Select a category</option>
                  {TEMPLATE_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
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
