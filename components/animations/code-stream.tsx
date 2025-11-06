"use client"

import { useEffect, useRef } from "react"

export function CodeStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // 🔒 Guard: ensure we're on the client
    if (typeof window === 'undefined') return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const codeSnippets = [
      "const",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
      "async",
      "await",
      "=>",
      "{}",
      "()",
      "[]",
      "let",
      "var",
      "new",
      "this",
    ]

    interface CodeParticle {
      x: number
      y: number
      speed: number
      text: string
      opacity: number
    }

    const particles: CodeParticle[] = []
    const particleCount = 30

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.y += particle.speed

        if (particle.y > canvas.height) {
          particle.y = -20
          particle.x = Math.random() * canvas.width
          particle.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        }

        ctx.font = "14px monospace"
        ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`
        ctx.fillText(particle.text, particle.x, particle.y)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-20 opacity-20" />
}