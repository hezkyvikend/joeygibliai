import * as React from "react"

import { cn } from "@/lib/utils"

type MousePosition = {
  x: number
  y: number
}

function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = React.useState<MousePosition>({ x: 0, y: 0 })

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return mousePosition
}

type Circle = {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
  rotation: number
  spin: number
}

export interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

function hexToRgb(hex: string): [number, number, number] {
  let normalized = hex.replace("#", "")
  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((char) => char + char)
      .join("")
  }

  const hexInt = Number.parseInt(normalized, 16)
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const saturation = s / 100
  const lightness = l / 100
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const hue = h / 60
  const x = chroma * (1 - Math.abs((hue % 2) - 1))

  let r = 0
  let g = 0
  let b = 0

  if (hue >= 0 && hue < 1) {
    r = chroma
    g = x
  } else if (hue >= 1 && hue < 2) {
    r = x
    g = chroma
  } else if (hue >= 2 && hue < 3) {
    g = chroma
    b = x
  } else if (hue >= 3 && hue < 4) {
    g = x
    b = chroma
  } else if (hue >= 4 && hue < 5) {
    r = x
    b = chroma
  } else {
    r = chroma
    b = x
  }

  const m = lightness - chroma / 2
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)]
}

function resolveColorToRgb(color: string): [number, number, number] {
  const normalized = color.trim()

  if (normalized.startsWith("#")) {
    return hexToRgb(normalized)
  }

  const hslTriplet = normalized.match(/^([0-9.]+)\s+([0-9.]+)%\s+([0-9.]+)%$/)
  if (hslTriplet) {
    return hslToRgb(Number.parseFloat(hslTriplet[1]), Number.parseFloat(hslTriplet[2]), Number.parseFloat(hslTriplet[3]))
  }

  const hslFunction = normalized.match(/^hsl\(\s*([0-9.]+)\s+([0-9.]+)%\s+([0-9.]+)%\s*\)$/i)
  if (hslFunction) {
    return hslToRgb(
      Number.parseFloat(hslFunction[1]),
      Number.parseFloat(hslFunction[2]),
      Number.parseFloat(hslFunction[3])
    )
  }

  return hexToRgb("#ffce1b")
}

function drawSparkle(context: CanvasRenderingContext2D, size: number): void {
  const inner = size * 0.4
  context.beginPath()
  context.moveTo(0, -size)
  context.lineTo(inner, -inner)
  context.lineTo(size, 0)
  context.lineTo(inner, inner)
  context.lineTo(0, size)
  context.lineTo(-inner, inner)
  context.lineTo(-size, 0)
  context.lineTo(-inner, -inner)
  context.closePath()
}

export function Particles({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0
}: ParticlesProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = React.useRef<HTMLDivElement>(null)
  const contextRef = React.useRef<CanvasRenderingContext2D | null>(null)
  const circlesRef = React.useRef<Circle[]>([])
  const mousePosition = useMousePosition()
  const mouseRef = React.useRef({ x: 0, y: 0 })
  const canvasSizeRef = React.useRef({ w: 0, h: 0 })
  const frameRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext("2d")
    }

    const dpr = window.devicePixelRatio || 1

    const resizeCanvas = () => {
      if (!canvasContainerRef.current || !canvasRef.current || !contextRef.current) {
        return
      }

      circlesRef.current = []
      canvasSizeRef.current.w = canvasContainerRef.current.offsetWidth
      canvasSizeRef.current.h = canvasContainerRef.current.offsetHeight

      canvasRef.current.width = canvasSizeRef.current.w * dpr
      canvasRef.current.height = canvasSizeRef.current.h * dpr
      canvasRef.current.style.width = `${canvasSizeRef.current.w}px`
      canvasRef.current.style.height = `${canvasSizeRef.current.h}px`

      contextRef.current.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const clearContext = () => {
      if (!contextRef.current) {
        return
      }
      contextRef.current.clearRect(0, 0, canvasSizeRef.current.w, canvasSizeRef.current.h)
    }

    const circleParams = (): Circle => {
      const x = Math.floor(Math.random() * canvasSizeRef.current.w)
      const y = Math.floor(Math.random() * canvasSizeRef.current.h)
      const particleSize = Math.floor(Math.random() * 2) + size

      return {
        x,
        y,
        translateX: 0,
        translateY: 0,
        size: particleSize,
        alpha: 0,
        targetAlpha: Number.parseFloat((Math.random() * 0.5 + 0.25).toFixed(2)),
        dx: (Math.random() - 0.5) * 0.1,
        dy: (Math.random() - 0.5) * 0.1,
        magnetism: 0.1 + Math.random() * 4,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02
      }
    }

    const rgb = resolveColorToRgb(color)

    const drawCircle = (circle: Circle, isUpdate = false) => {
      if (!contextRef.current) {
        return
      }

      const { x, y, translateX, translateY, size: circleSize, alpha, rotation } = circle
      contextRef.current.save()
      contextRef.current.translate(x + translateX, y + translateY)
      contextRef.current.rotate(rotation)
      drawSparkle(contextRef.current, circleSize)
      contextRef.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`
      contextRef.current.fill()
      contextRef.current.restore()

      if (!isUpdate) {
        circlesRef.current.push(circle)
      }
    }

    const drawParticles = () => {
      clearContext()
      for (let index = 0; index < quantity; index += 1) {
        drawCircle(circleParams())
      }
    }

    const remapValue = (value: number, start1: number, end1: number, start2: number, end2: number): number => {
      const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
      return remapped > 0 ? remapped : 0
    }

    const animate = () => {
      clearContext()

      circlesRef.current.forEach((circle, index) => {
        const edge = [
          circle.x + circle.translateX - circle.size,
          canvasSizeRef.current.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          canvasSizeRef.current.h - circle.y - circle.translateY - circle.size
        ]

        const closestEdge = edge.reduce((a, b) => Math.min(a, b))
        const remapClosestEdge = Number.parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2))

        if (remapClosestEdge > 1) {
          circle.alpha += 0.02
          if (circle.alpha > circle.targetAlpha) {
            circle.alpha = circle.targetAlpha
          }
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge
        }

        circle.x += circle.dx + vx
        circle.y += circle.dy + vy
        circle.translateX += (mouseRef.current.x / (staticity / circle.magnetism) - circle.translateX) / ease
        circle.translateY += (mouseRef.current.y / (staticity / circle.magnetism) - circle.translateY) / ease
        circle.rotation += circle.spin

        drawCircle(circle, true)

        if (
          circle.x < -circle.size ||
          circle.x > canvasSizeRef.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSizeRef.current.h + circle.size
        ) {
          circlesRef.current.splice(index, 1)
          drawCircle(circleParams())
        }
      })

      frameRef.current = window.requestAnimationFrame(animate)
    }

    resizeCanvas()
    drawParticles()
    animate()

    window.addEventListener("resize", resizeCanvas)
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [color, ease, quantity, size, staticity, vx, vy, refresh])

  React.useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const rect = canvasRef.current.getBoundingClientRect()
    const { w, h } = canvasSizeRef.current
    const x = mousePosition.x - rect.left - w / 2
    const y = mousePosition.y - rect.top - h / 2
    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2

    if (inside) {
      mouseRef.current.x = x
      mouseRef.current.y = y
    }
  }, [mousePosition.x, mousePosition.y])

  return (
    <div aria-hidden="true" className={cn("pointer-events-none", className)} ref={canvasContainerRef}>
      <canvas className="size-full" ref={canvasRef} />
    </div>
  )
}

Particles.displayName = "Particles"
