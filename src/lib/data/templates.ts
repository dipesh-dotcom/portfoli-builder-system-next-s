import prisma from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

// get all templates
export async function getTemplates() {
  "use cache";
  cacheLife("minutes");
  cacheTag("templates");

  return await prisma.portfolioTemplate.findMany({
    include: {
      sections: {
        orderBy: { order: "asc" },
      },
      _count: {
        select: { portfolios: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// get template by id
export async function getTemplateById(id: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag("templates");
  cacheTag(`template-${id}`);

  return await prisma.portfolioTemplate.findUnique({
    where: { id },
    include: {
      sections: {
        orderBy: { order: "asc" },
      },
    },
  });
}

// get published templates
export async function getPublishedTemplates() {
  "use cache";
  cacheLife("minutes");
  cacheTag("templates");

  return await prisma.portfolioTemplate.findMany({
    where: { isPublished: true },
    include: {
      sections: {
        where: { isEnabled: true },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { downloads: "desc" },
  });
}
