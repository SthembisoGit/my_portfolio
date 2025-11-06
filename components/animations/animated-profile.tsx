"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function AnimatedProfile() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Guard: ensure we're on the client
    if (typeof window === 'undefined') return

    const handleMouseMove = (e: MouseEvent) => {
      const container = document.getElementById("profile-container")
      if (container) {
        const rect = container.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const tiltX = isHovered ? mousePosition.y * 0.05 : 0
  const tiltY = isHovered ? -mousePosition.x * 0.05 : 0

  return (
    <div
      id="profile-container"
      className="relative mx-auto mb-8 h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated rings */}
      <div className="absolute inset-0 animate-spin-slow">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 border-t-cyan-500" />
      </div>
      <div className="absolute inset-2 animate-spin-reverse">
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 border-b-purple-500" />
      </div>
      <div className="absolute inset-4 animate-spin-slow">
        <div className="absolute inset-0 rounded-full border-2 border-green-500/30 border-r-green-500" />
      </div>

      {/* Glow effect */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-green-500/20 blur-xl transition-all duration-300 group-hover:blur-2xl" />

      {/* Profile image container */}
      <div
        className="absolute inset-6 overflow-hidden rounded-full border-4 border-background shadow-2xl shadow-cyan-500/20 transition-all duration-300"
        style={{
          transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isHovered ? 1.05 : 1})`,
        }}
      >
        <div className="relative h-full w-full bg-gradient-to-br from-cyan-500 via-purple-500 to-green-500">
          <Image src="/professional-developer-portrait.png" alt="Sthembiso Ndlovu" fill className="object-cover" priority />

          {/* Overlay with initials as fallback */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-600/90 via-purple-600/90 to-green-600/90 backdrop-blur-sm">
            <span className="text-6xl font-bold text-white">SN</span>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-400 animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2 rounded-full border-2 border-background bg-green-500 px-3 py-1 shadow-lg">
        <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
        <span className="text-xs font-semibold text-white">Available</span>
      </div>
    </div>
  )
}