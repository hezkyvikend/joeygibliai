import { Mail } from "lucide-react"

import { personalInfo } from "@/config/personal"
import { buttonVariants } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section className="scroll-mt-24 py-16 sm:py-24" id="contact">
      <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Open to impactful collaborations</h2>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
          I am currently open to staff or lead roles where I can own end-to-end AI systems, plus selected consulting collaborations focused on practical product delivery.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a aria-label="Send email" className={buttonVariants({ size: "lg" })} href={`mailto:${personalInfo.email}`}>
            <Mail className="h-4 w-4" />
            {personalInfo.email}
          </a>
          <a
            aria-label="Visit LinkedIn profile"
            className={buttonVariants({ size: "lg", variant: "outline" })}
            href={personalInfo.linkedinUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
