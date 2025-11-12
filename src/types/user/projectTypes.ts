export type ProjectData = {
  title: string;
  description: string;
  github_url?: string;
  demo_url?: string;
  preview_image?: string;
};

export type Project = {
  id: string;
  userId: string;
  title: string;
  description: string;
  github_url: string | null;
  demo_url: string | null;
  preview_image: string | null;
  created_at: Date;
  updated_at: Date;
};
