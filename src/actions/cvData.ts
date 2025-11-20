import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type {
  User,
  UserProfile,
  Education,
  Experience,
  Achievement,
  Skill,
  Language,
  Project,
} from "@prisma/client";
import { cacheTag, unstable_cache } from "next/cache";

// Define the user type with all relations
export type UserWithRelations = User & {
  profile: UserProfile | null;

  educations: Education[];
  experiences: Experience[];
  achievements: Achievement[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
};

// Define the return type explicitly
type CvDataSuccess = {
  success: true;
  data: UserWithRelations;
  statusCode: 200;
};

type CvDataError = {
  success: false;
  error: string;
  data: null;
  statusCode: 401 | 404 | 500;
};

export type CvDataResponse = CvDataSuccess | CvDataError;

async function fetchCvData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      educations: true,
      experiences: true,
      achievements: true,
      skills: true,
      languages: true,
      projects: true,
    },
  });

  return user;
}

// cached function
const getCachedCvData = unstable_cache(fetchCvData, ["resume"], {
  revalidate: 3600,
  tags: ["resume"],
});

export async function getCvData(): Promise<CvDataResponse> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
        data: null,
        statusCode: 401,
      };
    }

    const userId = session.user.id;

    const user = await getCachedCvData(userId);

    if (!user) {
      return {
        success: false,
        error: "User not found",
        data: null,
        statusCode: 404,
      };
    }

    return {
      success: true,
      data: user,
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error fetching CV data:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch data",
      data: null,
      statusCode: 500,
    };
  }
}
