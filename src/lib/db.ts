"use server";

import prisma from "./prisma";
import type {
  Template,
  TemplateCategory,
  Portfolio,
  PortfolioCustomization,
} from "@prisma/client";

// ============ TEMPLATE OPERATIONS ============
export async function getTemplates(): Promise<
  (Template & { category: TemplateCategory })[]
> {
  return await prisma.template.findMany({
    include: {
      category: true,
    },
    where: {
      published: true,
    },
  });
}

export async function getTemplateById(
  id: string
): Promise<(Template & { category: TemplateCategory }) | null> {
  return await prisma.template.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
}

export async function getTemplatesByCategory(
  categoryId: string
): Promise<(Template & { category: TemplateCategory })[]> {
  return await prisma.template.findMany({
    where: {
      categoryId,
      published: true,
    },
    include: {
      category: true,
    },
  });
}

export async function createTemplate(data: {
  name: string;
  description: string;
  categoryId: string;
  thumbnail?: string;
  code: string;
}): Promise<Template> {
  return await prisma.template.create({
    data: {
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
      thumbnail: data.thumbnail,
      code: data.code,
      published: true,
    },
  });
}

export async function updateTemplate(
  id: string,
  data: {
    name?: string;
    description?: string;
    categoryId?: string;
    thumbnail?: string;
    code?: string;
    published?: boolean;
  }
): Promise<Template> {
  return await prisma.template.update({
    where: { id },
    data,
  });
}

export async function deleteTemplate(id: string): Promise<Template> {
  return await prisma.template.delete({
    where: { id },
  });
}

// ============ CATEGORY OPERATIONS ============
export async function getCategories(): Promise<TemplateCategory[]> {
  return await prisma.templateCategory.findMany();
}

export async function createCategory(data: {
  name: string;
  slug: string;
  description?: string;
}): Promise<TemplateCategory> {
  return await prisma.templateCategory.create({
    data,
  });
}

// ============ PORTFOLIO OPERATIONS ============
export async function getPortfolios(
  userId: string
): Promise<
  (Portfolio & { template: Template & { category: TemplateCategory } })[]
> {
  return await prisma.portfolio.findMany({
    where: { userId },
    include: {
      template: {
        include: {
          category: true,
        },
      },
    },
  });
}

export async function getPortfolioById(id: string): Promise<
  | (Portfolio & {
      template: Template & { category: TemplateCategory };
      customizations: PortfolioCustomization[];
    })
  | null
> {
  return await prisma.portfolio.findUnique({
    where: { id },
    include: {
      template: {
        include: {
          category: true,
        },
      },
      customizations: true,
    },
  });
}

export async function getPortfolioBySlug(
  userId: string,
  slug: string
): Promise<
  | (Portfolio & {
      template: Template & { category: TemplateCategory };
      customizations: PortfolioCustomization[];
    })
  | null
> {
  return await prisma.portfolio.findFirst({
    where: { userId, slug },
    include: {
      template: {
        include: {
          category: true,
        },
      },
      customizations: true,
    },
  });
}

export async function createPortfolio(data: {
  userId: string;
  templateId: string;
  title: string;
  slug: string;
}): Promise<Portfolio> {
  return await prisma.portfolio.create({
    data,
  });
}

export async function updatePortfolio(
  id: string,
  data: {
    title?: string;
    slug?: string;
    published?: boolean;
  }
): Promise<Portfolio> {
  return await prisma.portfolio.update({
    where: { id },
    data,
  });
}

export async function deletePortfolio(id: string): Promise<Portfolio> {
  return await prisma.portfolio.delete({
    where: { id },
  });
}

// ============ CUSTOMIZATION OPERATIONS ============
export async function addPortfolioCustomization(
  portfolioId: string,
  data: {
    templateId: string;
    userId: string;
    fieldName: string;
    fieldValue: string;
    fieldType: string;
  }
): Promise<PortfolioCustomization> {
  return await prisma.portfolioCustomization.upsert({
    where: {
      portfolioId_fieldName: {
        portfolioId,
        fieldName: data.fieldName,
      },
    },
    update: {
      fieldValue: data.fieldValue,
    },
    create: {
      portfolioId,
      templateId: data.templateId,
      userId: data.userId,
      fieldName: data.fieldName,
      fieldValue: data.fieldValue,
      fieldType: data.fieldType,
    },
  });
}

export async function updatePortfolioCustomization(
  customizationId: string,
  value: string
): Promise<PortfolioCustomization> {
  return await prisma.portfolioCustomization.update({
    where: { id: customizationId },
    data: { fieldValue: value },
  });
}

export async function getPortfolioCustomizations(
  portfolioId: string
): Promise<PortfolioCustomization[]> {
  return await prisma.portfolioCustomization.findMany({
    where: { portfolioId },
  });
}

export async function deletePortfolioCustomization(
  id: string
): Promise<PortfolioCustomization> {
  return await prisma.portfolioCustomization.delete({
    where: { id },
  });
}
