"use client"

import { useEffect, useState } from "react"

export function EasterEggs() {
  const [konamiProgress, setKonamiProgress] = useState(0)
  const [showSecret, setShowSecret] = useState(false)

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiProgress]) {
        const newProgress = konamiProgress + 1
        setKonamiProgress(newProgress)

        if (newProgress === konamiCode.length) {
          setShowSecret(true)
          setKonamiProgress(0)

          // Create confetti effect
          createConfetti()

          // Show secret message
          setTimeout(() => {
            alert(
              "🎉 Konami Code Activated! You found the secret! 🎮\n\nYou're clearly a developer of culture. Thanks for exploring!",
            )
          }, 500)
        }
      } else {
        setKonamiProgress(0)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konamiProgress])

  const createConfetti = () => {
    const colors = ["#06b6d4", "#a855f7", "#10b981", "#f59e0b", "#ef4444"]
    const confettiCount = 50

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div")
      confetti.style.position = "fixed"
      confetti.style.width = "10px"
      confetti.style.height = "10px"
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.left = Math.random() * window.innerWidth + "px"
      confetti.style.top = "-10px"
      confetti.style.opacity = "1"
      confetti.style.pointerEvents = "none"
      confetti.style.zIndex = "9999"
      confetti.style.borderRadius = "50%"
      document.body.appendChild(confetti)

      const duration = Math.random() * 3 + 2
      const xMovement = (Math.random() - 0.5) * 200

      confetti.animate(
        [
          { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: 1 },
          {
            transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${Math.random() * 360}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: duration * 1000,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        },
      )

      setTimeout(() => {
        confetti.remove()
      }, duration * 1000)
    }
  }

  return null
}
