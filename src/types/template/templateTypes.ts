// Template type definitions
export interface Template {
  id: string;
  name: string;
  description: string;

  thumbnail?: string | null;
  code: string;
  preview?: string | null;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    description?: string | null;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  };
  template?: {
    name: string;
    thumbnail?: string;
    slug: string;
    description?: string;
    categoryId: string;
  };
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
