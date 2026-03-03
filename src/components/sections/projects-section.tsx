import { ArrowUpRight, Github } from "lucide-react"

import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProjectsSection() {
  return (
    <section className="scroll-mt-24 py-16 sm:py-24" id="projects">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Projects</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Things I've Built</h2>
        <p className="max-w-2xl text-muted-foreground">
        A closer look at the AI systems, experiments, and technical deep dives I’ve developed.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card className="flex h-full flex-col" key={project.id}>
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <CardTitle>{project.title}</CardTitle>
                {project.timeframe ? <p className="text-sm text-muted-foreground">{project.timeframe}</p> : null}
              </div>
              <CardDescription className="text-foreground/80">{project.subtitle}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-5">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={`${project.id}-${tag}`} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {project.impact ? (
                <p className="rounded-lg border border-border/80 bg-background/60 p-3 text-sm text-foreground/90">{project.impact}</p>
              ) : null}

              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {project.launchUrl ? (
                  <a
                    aria-label={`Launch ${project.title}`}
                    className={buttonVariants({ variant: "default" })}
                    href={project.launchUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Launch
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    aria-label={`View ${project.title} in GitHub`}
                    className={buttonVariants({ variant: "outline" })}
                    href={project.githubUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Github className="h-4 w-4" />
                    View in GitHub
                  </a>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="flex h-full flex-col border-dashed border-border/80 bg-background/50">
          <CardHeader>
            <CardTitle>More to come...</CardTitle>
            <CardDescription className="text-foreground/80">I know everyone says that.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              I am actively working on additional projects and case studies. Check back soon for new launches.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
