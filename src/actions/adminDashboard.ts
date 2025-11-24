"use server";

import { countAchievements } from "./achievement";
import { countEducations } from "./education";
import { countExperiences } from "./experience";
import { countLanguages } from "./language";
import { countProjects } from "./projects";
import { countSkills } from "./skill";
import { countUsers } from "./user";

export async function getDashboardStatsAction() {
  try {
    return {
      totalUsers: await countUsers(),
      educationRecords: await countEducations(),
      experienceRecords: await countExperiences(),
      achievements: await countAchievements(),
      skills: await countSkills(),
      languages: await countLanguages(),
      projects: await countProjects(),
    };
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    throw new Error("Failed to fetch dashboard stats");
  }
}
