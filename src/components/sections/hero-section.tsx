import { Download, Github, Linkedin } from "lucide-react"

import { personalInfo } from "@/config/personal"
import avatar from "@/assets/avatar.png"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative scroll-mt-24 py-16 sm:py-24" id="hero">
      <div className="grid gap-10 md:grid-cols-[1.3fr,0.7fr] md:items-center">
        <div className="space-y-6">
          <Badge className="w-fit bg-background text-foreground font-semibold" variant="outline">
            Agentic AI · Solutions Architecture · Product Delivery
          </Badge>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{personalInfo.tagline}</p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {personalInfo.name}
            </h1>
            <h2 className="text-xl font-semibold text-primary sm:text-2xl">{personalInfo.title}</h2>
          </div>

          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">{personalInfo.summary}</p>

          <div className="flex flex-wrap gap-3">
            <a
              className={buttonVariants({ size: "lg" })}
              download
              href={personalInfo.cvUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <a
              aria-label="Visit GitHub profile"
              className={buttonVariants({ size: "lg", variant: "outline" })}
              href={personalInfo.githubUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              aria-label="Visit LinkedIn profile"
              className={buttonVariants({ size: "lg", variant: "outline" })}
              href={personalInfo.linkedinUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[17rem] md:max-w-[20rem]">
          <div className="relative aspect-square overflow-hidden rounded-full border border-border/70 bg-card p-2">
            <img
              alt={personalInfo.avatarAlt}
              className="relative aspect-square w-full rounded-full object-cover"
              height={480}
              src={avatar}
              width={480}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
