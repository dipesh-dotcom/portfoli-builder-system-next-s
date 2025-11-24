"use client";

import { useEffect, useState } from "react";
import { getTemplatesAction } from "@/actions/templates";
import { TemplateCard } from "@/components/admin/template/TemplateCard";
import { Template } from "@/types/template/templateTypes";
import Link from "next/link";

export default function AdminDashboard() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const data = await getTemplatesAction();
        setTemplates(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load templates"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading templates...</p>
      </div>
    );
  }

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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Total Templates</p>
            <p className="text-3xl font-bold">{templates.length}</p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Categories</p>
            <p className="text-3xl font-bold">
              {new Set(templates.map((t) => t.category?.name || "")).size}
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

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg m-4 text-red-700">
          {error}
        </div>
      )}

      {/* Templates Grid */}
      <div className="py-12 px-4 max-w-7xl mx-auto">
        {templates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No templates yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                showActions={true}
                onEdit={() =>
                  (window.location.href = `/admin/templates/edit/${template.id}`)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
