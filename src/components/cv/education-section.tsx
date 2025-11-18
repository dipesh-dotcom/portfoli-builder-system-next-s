import type { Education } from "@prisma/client";

interface EducationSectionProps {
  educations: Education[];
}

export function EducationSection({ educations }: EducationSectionProps) {
  return (
    <section id="education">
      <h2 className="text-2xl font-bold mb-8 text-foreground">Education</h2>
      <div className="space-y-6">
        {educations.map((edu, idx) => (
          <div
            key={idx}
            className="pb-6 border-b border-border last:border-b-0 last:pb-0"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-foreground">
                  {edu.instituteName}
                </h3>
                <p className="text-sm text-muted-foreground">{edu.degree}</p>
              </div>
            </div>
            <p className="text-sm text-accent">{`${edu.startYear}-${edu.endYear}`}</p>

            {/* <p className="text-sm text-muted-foreground">GPA: {edu.degree}</p> */}
          </div>
        ))}
      </div>
    </section>
  );
}
