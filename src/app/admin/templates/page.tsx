"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Template = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  category: string;
  isPublished: boolean;
  isPremium: boolean;
  downloads: number;
  createdAt: string;
  _count: {
    portfolios: number;
  };
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/admin/templates");
      const data = await res.json();
      if (data.success) {
        setTemplates(data.data);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    try {
      const res = await fetch(`/api/admin/templates/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchTemplates();
      }
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/templates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !currentStatus }),
      });

      if (res.ok) {
        fetchTemplates();
      }
    } catch (error) {
      console.error("Error updating template:", error);
    }
  };

  if (loading) {
    return <div className="p-8">Loading templates...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Portfolio Templates</h1>
        <Link
          href="/admin/templates/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Template
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="border rounded-lg p-4 shadow">
            {template.thumbnail && (
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
            <p className="text-gray-600 text-sm mb-4">
              {template.description || "No description"}
            </p>

            <div className="flex gap-2 mb-4 text-sm">
              <span className="bg-gray-200 px-2 py-1 rounded">
                {template.category}
              </span>
              {template.isPublished && (
                <span className="bg-green-200 px-2 py-1 rounded">
                  Published
                </span>
              )}
              {template.isPremium && (
                <span className="bg-yellow-200 px-2 py-1 rounded">Premium</span>
              )}
            </div>

            <div className="text-sm text-gray-500 mb-4">
              <p>Used by: {template._count.portfolios} portfolios</p>
              <p>Downloads: {template.downloads}</p>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/admin/templates/${template.id}/edit`}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => togglePublish(template.id, template.isPublished)}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                {template.isPublished ? "Unpublish" : "Publish"}
              </button>
              <button
                onClick={() => handleDelete(template.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No templates yet. Create your first template!
        </div>
      )}
    </div>
  );
}
