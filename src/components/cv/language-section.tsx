import { Language } from "@prisma/client";

interface LanguageSectionProps {
  languages: Language[];
}

export function LanguagesSection({ languages }: LanguageSectionProps) {
  return (
    <section id="languages">
      <h2 className="text-2xl font-bold mb-8 text-foreground">Languages</h2>
      <div className="space-y-3">
        {languages.map((lang, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-foreground font-medium">{lang.name}</span>
            <span className="text-sm text-muted-foreground">
              {lang.proficiency}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
