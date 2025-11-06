"use client"

import { useEffect, useRef } from "react"

export function NeonGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // 🔒 Guard: ensure we're in the browser
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

    const gridSize = 50
    let offset = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw vertical lines
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)"
      ctx.lineWidth = 1
      for (let x = offset % gridSize; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = offset % gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      offset += 0.5
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-20 opacity-20" />
}