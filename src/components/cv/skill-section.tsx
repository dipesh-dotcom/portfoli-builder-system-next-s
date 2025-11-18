import { Skill } from "@prisma/client";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills">
      <h2 className="text-2xl font-bold mb-8 text-foreground">Skills</h2>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="px-4 py-2 bg-card rounded-full border border-border hover:bg-primary/20 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="font-medium">{skill.skillName}</span>
            <span className="ml-2 text-xs text-accent">({skill.rating})</span>
          </div>
        ))}
      </div>
    </section>
  );
}
