import { experience } from "@/data/experience"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ExperienceSection() {
  return (
    <section className="scroll-mt-24 py-16 sm:py-24" id="experience">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Experience</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Career timeline</h2>
        <p className="max-w-2xl text-muted-foreground">
          Roles focused on turning ambiguous goals into reliable software and measurable business outcomes.
        </p>
      </div>

      <div className="relative space-y-6 pl-10 before:absolute before:bottom-2 before:left-4 before:top-2 before:w-px before:bg-border">
        {experience.map((item) => (
          <article className="relative" key={`${item.company}-${item.start}`}>
            <span
              aria-hidden="true"
              className="absolute -left-8 top-6 h-4 w-4 rounded-full border-2 border-background bg-accent"
            />

            <Card className="overflow-hidden">
              <CardHeader>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <CardTitle className="text-xl">{item.role}</CardTitle>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.start} - {item.end}
                  </p>
                </div>
                <CardDescription className="font-medium text-foreground/80">
                  {item.company}
                  {item.location ? ` · ${item.location}` : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{item.summary}</p>
                <ul className="space-y-2">
                  {item.bullets.map((bullet) => (
                    <li className="flex gap-2 text-sm text-foreground/90 sm:text-base" key={bullet}>
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </article>
        ))}
      </div>
    </section>
  )
}
