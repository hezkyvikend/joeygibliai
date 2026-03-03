import * as React from "react"

import { SiteHeader } from "@/components/layout/site-header"
import { ContactSection } from "@/components/sections/contact-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { Particles } from "@/components/ui/particles"

function App() {
  const [accentColor, setAccentColor] = React.useState("47 100% 55%")

  React.useEffect(() => {
    const accent = window.getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()
    if (accent) {
      setAccentColor(accent)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <Particles className="fixed inset-0 z-0 opacity-80" color={accentColor} ease={70} quantity={260} size={2} staticity={60} />
      <SiteHeader />
      <main className="container relative z-10 pb-16 pt-20 sm:pt-24">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
