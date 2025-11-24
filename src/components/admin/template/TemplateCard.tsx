"use client";

import { Template } from "@/types/template/templateTypes";

interface TemplateCardProps {
  template: Template;
  onClick?: () => void;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TemplateCard({
  template,
  onClick,
  showActions = false,
  onEdit,
  onDelete,
}: TemplateCardProps) {
  return (
    <div
      className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 bg-muted">
        <img
          src={template.thumbnail || "/placeholder.svg"}
          alt={template.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          {template.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
            {template.category?.name}
          </span>
          {showActions && (
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={onEdit}
                className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
