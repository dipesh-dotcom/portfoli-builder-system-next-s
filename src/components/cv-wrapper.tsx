import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { EducationSection } from "./cv/education-section";
import { ExperienceSection } from "./cv/experience-section";
import { ProjectsSection } from "./cv/project-section";
import { SkillsSection } from "./cv/skill-section";
import { LanguagesSection } from "./cv/language-section";
import { getCvData } from "@/actions/cvData";
import { auth } from "@/lib/auth";

export async function CVWrapper() {
  const session = await auth();
  const response = await getCvData();
  if (!response.success) {
    return (
      <div className="bg-background text-foreground p-12 max-w-4xl mx-auto">
        <div className="text-center text-red-500">
          <p>Failed to load CV data</p>
          <p className="text-sm text-muted-foreground">{response.error}</p>
        </div>
      </div>
    );
  }

  // After the check above, TypeScript knows response.data is UserWithRelations
  const userData = response.data;

  return (
    <div
      id="cv-content"
      className="bg-background text-foreground p-12 max-w-4xl mx-auto"
    >
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-1">
          {userData.name || session?.user?.name}
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          {userData.profile?.occupation || "Professional"}
        </p>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>
              {userData.profile?.location || "Changunarayan, Bhaktapur"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{"9709391002"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{userData.email || "dipeshsth00@gmail.com"}</span>
          </div>
          {/* {userData.profile?.github && (
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <span>{userData.profile.github}</span>
            </div>
          )} */}
          {/* {userData.profile?.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <span>{userData.profile.linkedin}</span>
            </div>
          )} */}
        </div>

        {/* Summary */}
        <p className="text-sm leading-relaxed text-muted-foreground border-t border-border pt-4">
          {userData.profile?.bio ||
            "I am an outcome-driven web developer skilled in designing, developing, and maintaining user-friendly applications. Proficient in frontend, backend, database management, and API integration, I excel in problem-solving, optimization, and scalability. Passionate about learning new technologies and delivering innovative solutions."}
        </p>
      </div>

      {/* CV Sections - Pass data as props */}
      <div className="space-y-8">
        <EducationSection educations={userData.educations} />
        <ExperienceSection experiences={userData.experiences} />
        <ProjectsSection projects={userData.projects} />
        <SkillsSection skills={userData.skills} />
        <LanguagesSection languages={userData.languages} />
      </div>
    </div>
  );
}
