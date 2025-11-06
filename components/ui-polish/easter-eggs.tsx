"use client"

import { useEffect } from 'react'

export function EasterEggs() {
  useEffect(() => {
    // 🔒 Guard: only run on the client
    if (typeof window === 'undefined') return

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let konamiIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      // Normalize key (lowercase for 'b', 'a')
      const key = e.key.toLowerCase()

      if (key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          // 🎉 Easter egg triggered!
          alert('🎉 You unlocked a secret! Check the console for a message.')
          console.log(
            `%c✨ Congrats, Sthembiso! You found the Konami code!\nKeep building amazing things!`,
            'font-size: 16px; color: cyan; font-weight: bold; background: black; padding: 10px;'
          )
          // Reset to allow re-trigger
          konamiIndex = 0
        }
      } else {
        // Reset on wrong key
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // This component renders nothing — it's purely behavioral
  return null
}