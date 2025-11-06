"use client"

import { useEffect, useState } from "react"

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main glow */}
      <div
        className="pointer-events-none fixed -z-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl transition-all duration-300"
        style={{
          left: position.x - 128,
          top: position.y - 128,
        }}
      />
      {/* Secondary glow */}
      <div
        className="pointer-events-none fixed -z-10 h-32 w-32 rounded-full bg-purple-500/30 blur-2xl transition-all duration-500"
        style={{
          left: position.x - 64,
          top: position.y - 64,
        }}
      />
    </>
  )
}
