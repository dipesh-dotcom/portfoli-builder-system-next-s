import { Project } from "@prisma/client";

interface ProjectsSectionProps {
  projects: Project[];
}
export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects">
      <h2 className="text-2xl font-bold mb-8 text-foreground">Projects</h2>
      <div className="space-y-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="pb-8 border-b border-border last:border-b-0 last:pb-0"
          >
            <div className="flex justify-between items-start gap-4 mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">
                  {project.title}
                </h3>
                <p className="text-sm text-accent mt-1">
                  {project.description}
                </p>
              </div>
              <div className="p-2 hover:bg-card rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                <p className="text-sm text-accent mt-1">{project.github_url}</p>{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
