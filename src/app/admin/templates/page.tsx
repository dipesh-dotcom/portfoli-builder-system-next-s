"use client";

import { useState } from "react";
import { MOCK_TEMPLATES } from "@/lib/mock-data";
import Link from "next/link";
import { Template } from "@/types/template/templateTypes";
import { TemplateCard } from "@/components/admin/template/TemplateCard";

export default function AdminDashboard() {
  const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  const handleDelete = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage portfolio templates</p>
          </div>
          <Link
            href="/admin/templates/create"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold"
          >
            Create Template
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="py-8 px-4 border-b border-border bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">Total Templates</p>
              <p className="text-3xl font-bold">{templates.length}</p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">Categories</p>
              <p className="text-3xl font-bold">
                {new Set(templates.map((t) => t.category)).size}
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="text-sm font-semibold">
                {templates.length > 0
                  ? new Date(templates[0].updatedAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {templates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                No templates yet
              </p>
              <Link
                href="/admin/create"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Create First Template
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div key={template.id}>
                  <TemplateCard
                    template={template}
                    showActions={true}
                    onEdit={() => {
                      window.location.href = `/admin/templates/edit/${template.id}`;
                    }}
                    onDelete={() => setShowDeleteConfirm(template.id)}
                  />
                  {showDeleteConfirm === template.id && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                      <div className="bg-card rounded-lg p-6 max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">
                          Delete Template?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                          This action cannot be undone. The template "
                          {template.name}" will be permanently deleted.
                        </p>
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="px-4 py-2 bg-muted text-muted-foreground rounded hover:bg-muted/80"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDelete(template.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
