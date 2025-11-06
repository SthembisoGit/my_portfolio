"use client"

import { useState, useEffect } from "react"

interface TerminalAnimationProps {
  onComplete?: () => void
}

export function TerminalAnimation({ onComplete }: TerminalAnimationProps) {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)

  const terminalLines = [
    "> Initializing connection...",
    "> Connecting to server...",
    "> Encrypting message...",
    "> ████████████████████ 100%",
    "> Message delivered successfully ✓",
  ]

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const timeout = setTimeout(
        () => {
          setLines((prev) => [...prev, terminalLines[currentLine]])
          setCurrentLine((prev) => prev + 1)
        },
        currentLine === 3 ? 1000 : 500,
      )

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      const timeout = setTimeout(onComplete, 1000)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, onComplete])

  return (
    <div className="rounded-lg border-2 border-green-500/50 bg-black/90 p-4 font-mono text-sm text-green-400 shadow-lg shadow-green-500/20">
      {lines.map((line, i) => (
        <div key={i} className="mb-1 animate-in fade-in slide-in-from-left-2">
          {line}
        </div>
      ))}
      {currentLine < terminalLines.length && <span className="inline-block h-4 w-2 animate-pulse bg-green-400" />}
    </div>
  )
}
