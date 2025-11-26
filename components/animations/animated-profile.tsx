"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function AnimatedProfile() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Track mouse position for subtle tilt
  useEffect(() => {
    if (typeof window === "undefined") return

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

  const tiltX = isHovered ? mousePosition.y * 0.03 : 0
  const tiltY = isHovered ? -mousePosition.x * 0.03 : 0

  return (
    <div
      id="profile-container"
      className="relative mx-auto mb-8 h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle Tech Rings */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20" />
        <div className="absolute inset-1 rounded-full border-2 border-purple-400/20" />
        <div className="absolute inset-2 rounded-full border-2 border-green-400/20" />
      </div>

      {/* Glow */}
      <div className="absolute inset-3 rounded-full bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-green-400/20 blur-lg transition-all duration-300" />

      {/* Profile Image */}
      <div
        className="absolute inset-3 overflow-hidden rounded-full border-2 border-background shadow-lg transition-transform duration-300"
        style={{
          transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isHovered ? 1.03 : 1})`,
        }}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500/80 via-purple-500/80 to-green-500/80">
            <span className="text-5xl font-bold text-white">SN</span>
          </div>
        )}

        <Image
          src="/myProfile.jpg"
          alt="Sthembiso Ndlovu"
          fill
          className="object-cover"
          priority
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
        />
      </div>

      {/* Floating tech particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-400 animate-float"
            style={{
              left: `${15 + i * 16}%`,
              top: `${10 + (i % 3) * 28}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2.5 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border-2 border-background bg-green-500 px-3 py-1 shadow-md">
        <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
        <span className="text-xs font-semibold text-white">Available</span>
      </div>
    </div>
  )
}
