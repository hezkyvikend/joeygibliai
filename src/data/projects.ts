export type Project = {
  id: string
  title: string
  subtitle: string
  timeframe?: string
  description: string
  tags: string[]
  impact?: string
  launchUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: "yes-and-agent",
    title: "yes,and.ai",
    subtitle: "Collaborative visual improv assistant",
    timeframe: "2025",
    description:
      "An improv-style AI product where users and persona-driven agents co-create a scene through \"yes, and\" conversation, then synthesize that transcript into a final DALL-E image.",
    tags: ["React", "FastAPI", "LangChain", "LangSmith", "OpenAI API", "SSE"],
    impact:
      "Demonstrated a production-ready AI collaboration workflow with structured prompt templating, streaming chat, robust observability, and Azure deployment via GitHub Actions.",
    launchUrl: "https://yesand.joeygibli.ai",
    githubUrl: "https://github.com/hezkyvikend/yesand"
  }
]
