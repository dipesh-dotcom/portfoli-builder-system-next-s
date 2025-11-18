import type { Experience } from "@prisma/client";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience">
      <h2 className="text-2xl font-bold mb-8 text-foreground">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="pb-6 border-b border-border last:border-b-0 last:pb-0"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-foreground">
                  {exp.position}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {exp.companyName}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{`${exp.startYear}-${exp.endYear}`}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
