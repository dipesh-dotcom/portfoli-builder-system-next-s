// Template type definitions
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  code: string;
  preview?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateCategory {
  id: string;
  name: string;
  slug: string;
}

export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
}

export interface Portfolio {
  id: string;
  userId: string;
  templateId: string;
  title: string;
  customizations: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
