"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { X, Terminal, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Command {
  input: string
  output: string[]
  type?: "success" | "error" | "info"
}

export function DevConsole() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const asciiArt = `
   _____ _   _                     _     _           
  / ____| | | |                   | |   (_)          
 | (___ | |_| |__   ___ _ __ ___ | |__  _ ___  ___  
  \\___ \\| __| '_ \\ / _ \\ '_ \` _ \\| '_ \\| / __|/ _ \\ 
  ____) | |_| | | |  __/ | | | | | |_) | \\__ \\ (_) |
 |_____/ \\__|_| |_|\\___|_| |_| |_|_.__/|_|___/\\___/ 
                                                      
  Developer Portfolio Terminal v1.0.0
  Type 'help' for available commands
  
  🥚 Easter Egg: Try the Konami Code! (↑↑↓↓←→←→BA)
  `

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const args = trimmedCmd.split(" ")
    const command = args[0]

    let output: string[] = []
    let type: "success" | "error" | "info" = "info"

    switch (command) {
      // ... (all other cases remain unchanged until 'resume') ...

      case "resume":
        output = ["Downloading resume...", ""]
        try {
          const res = await fetch("/api/resume/active")
          const data = await res.json()
          if (data.url) {
            // ✅ Guard window access
            if (typeof window !== 'undefined') {
              window.open(data.url, "_blank")
              output.push("✓ Resume opened in new tab")
              type = "success"
            } else {
              output.push("Resume URL: " + data.url)
              type = "info"
            }
          } else {
            output.push("No active resume found.")
            type = "error"
          }
        } catch (error) {
          output = ["Error downloading resume. Please try again later."]
          type = "error"
        }
        break

      // ... (rest of cases unchanged) ...

      case "clear":
        setHistory([])
        return

      case "":
        return

      default:
        output = [`Command not found: ${command}`, "Type 'help' for available commands.", ""]
        type = "error"
    }

    setHistory((prev) => [...prev, { input: cmd, output, type }])
    setCommandHistory((prev) => [...prev, cmd])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      executeCommand(input)
      setInput("")
      setHistoryIndex(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 h-14 w-14 rounded-full shadow-lg shadow-cyan-500/50 transition-all hover:shadow-cyan-500/80"
        size="icon"
      >
        <Terminal className="h-6 w-6" />
        <span className="sr-only">Open Developer Console</span>
      </Button>
    )
  }

  return (
    <Card
      className={`fixed z-50 border-2 border-cyan-500/50 bg-black/95 font-mono text-sm shadow-2xl shadow-cyan-500/50 backdrop-blur-sm transition-all ${
        isMinimized ? "bottom-24 right-6 h-14 w-80" : "bottom-24 right-6 h-[600px] w-[800px] max-w-[calc(100vw-3rem)]"
      }`}
    >
      <div className="flex items-center justify-between border-b border-cyan-500/50 bg-cyan-500/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-cyan-500" />
          <span className="font-semibold text-cyan-500">sthembiso@portfolio:~$</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-cyan-500 hover:bg-cyan-500/20"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-cyan-500 hover:bg-cyan-500/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={outputRef} className="h-[calc(100%-8rem)] overflow-y-auto p-4 text-green-400">
            <pre className="text-xs text-cyan-500">{asciiArt}</pre>
            {history.map((cmd, i) => (
              <div key={i} className="mb-4">
                <div className="text-cyan-500">
                  <span className="text-purple-500">sthembiso@portfolio</span>
                  <span className="text-white">:</span>
                  <span className="text-cyan-500">~</span>
                  <span className="text-white">$ </span>
                  {cmd.input}
                </div>
                <div
                  className={`mt-1 whitespace-pre-wrap ${
                    cmd.type === "error" ? "text-red-400" : cmd.type === "success" ? "text-green-400" : "text-gray-300"
                  }`}
                >
                  {cmd.output.join("\n")}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-cyan-500/50 p-4">
            <div className="flex items-center gap-2">
              <span className="text-purple-500">sthembiso@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-cyan-500">~</span>
              <span className="text-white">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-green-400 outline-none"
                autoFocus
              />
            </div>
          </form>
        </>
      )}
    </Card>
  )
}