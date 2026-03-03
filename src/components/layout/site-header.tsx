const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
] as const

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background">
      <div className="container flex h-16 items-center justify-between gap-4">
        <a className="shrink-0 font-semibold tracking-tight text-foreground" href="#hero">
          joeygibli.ai
        </a>

        <nav aria-label="Primary" className="flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="shrink-0 rounded-md px-2 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3 sm:text-sm"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
