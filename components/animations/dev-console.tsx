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
      case "help":
        output = [
          "Available commands:",
          "",
          "  whoami          - Display information about Sthembiso",
          "  projects        - List all projects",
          "  skills          - Show technical skills",
          "  experience      - Display work experience",
          "  education       - Show education background",
          "  contact         - Get contact information",
          "  resume          - Download resume PDF",
          "  stats           - Show GitHub statistics",
          "  availability    - Check current availability",
          "  reviews         - Show recent reviews",
          "  motivation      - Get a random programming quote",
          "  secret          - Reveal a secret message",
          "  matrix          - Enter the Matrix",
          "  clear           - Clear the terminal",
          "  help            - Show this help message",
          "",
        ]
        type = "info"
        break

      case "availability":
        output = [
          "Current Availability Status:",
          "",
          "📅 Available: Weekdays 9 AM - 6 PM SAST (GMT+2)",
          "🏢 Current: Completing WIL at Denel Aerospace",
          "🎯 Seeking: Full-time opportunities from 2026",
          "",
          "Preferred Roles:",
          "  • Full-Stack Developer",
          "  • Backend Developer (Java/Python)",
          "  • Software Engineer",
          "",
          "Contact me to schedule an interview or call!",
          "",
        ]
        type = "success"
        break

      case "reviews":
        output = ["Fetching recent reviews...", ""]
        try {
          const res = await fetch("/api/reviews")
          const reviews = await res.json()
          if (reviews.length > 0) {
            output.push(`Total Reviews: ${reviews.length}`)
            output.push("")
            reviews.slice(0, 3).forEach((r: any, i: number) => {
              output.push(`${i + 1}. ${r.name} - ${r.role} at ${r.company}`)
              output.push(`   Rating: ${"⭐".repeat(r.rating)}`)
              output.push(`   "${r.content.substring(0, 100)}..."`)
              output.push("")
            })
          } else {
            output.push("No reviews yet. Be the first to leave a review!")
          }
          type = "success"
        } catch (error) {
          output = ["Error fetching reviews. Please try again later."]
          type = "error"
        }
        break

      case "secret":
        output = [
          "",
          "🎉 You found a secret command!",
          "",
          "Here's a fun fact: This entire portfolio was built with Next.js 16,",
          "features 14+ interactive components, and has a Lighthouse score of 98+!",
          "",
          "Try typing 'matrix' for another surprise...",
          "",
        ]
        type = "success"
        break

      case "matrix":
        output = [
          "",
          "Wake up, Neo...",
          "The Matrix has you...",
          "Follow the white rabbit.",
          "",
          "🐰 Knock, knock, Neo.",
          "",
          "Just kidding! But seriously, check out the Matrix Rain effect",
          "in the Experience section. It's pretty cool!",
          "",
        ]
        type = "success"
        break

      case "whoami":
        output = [

          "",
          "Name: Sthembiso Ndlovu",
          "Role: Computer Science Student | Software Development Intern",
          "Location: Tembisa, Gauteng, South Africa",
          "",
          "Summary:",
          "Motivated Computer Science final year student with a strong foundation",
          "in software development, databases, and problem-solving. Experienced in",
          "customer-facing roles, technical support, and team collaboration.",
          "",
          "Specialties: Java | Python | SQL | Full-Stack Development",
          "",
        ]
        type = "success"
        break

      case "projects":
        output = ["Fetching projects from database...", ""]
        try {
          const res = await fetch("/api/projects")
          const projects = await res.json()
          if (projects.length > 0) {
            projects.forEach((p: any, i: number) => {
              output.push(`${i + 1}. ${p.title}`)
              output.push(`   ${p.description}`)
              output.push(`   Tech: ${p.technologies?.join(", ") || "N/A"}`)
              output.push("")
            })
          } else {
            output.push("No projects found. Add some in the admin panel!")
          }
          type = "success"
        } catch (error) {
          output = ["Error fetching projects. Please try again later."]
          type = "error"
        }
        break

      case "skills":
        output = [
          "Technical Skills:",
          "",
          "Languages:",
          "  • Java, Python, JavaScript, HTML/CSS, SQL",
          "",
          "Technologies:",
          "  • REST APIs, OOP & SDLC, Git & Version Control",
          "  • Linux, System Analysis, Database Management",
          "",
          "Soft Skills:",
          "  • Analytical problem-solving",
          "  • Team collaboration and adaptability",
          "  • Clear communication",
          "  • Time management",
          "",
        ]
        type = "success"
        break

      case "experience":
        output = [
          "Work Experience:",
          "",
          "1. Denel Aerospace – IT Intern (WIL)",
          "   Sep 2025 – Present | Kempton Park, Gauteng",
          "   • Completing Work Integrated Learning (WIL)",
          "   • Provide IT and administrative support",
          "   • System monitoring and technical documentation",
          "",
          "2. Outdoor Warehouse – Sales Assistant",
          "   Mar 2024 – Sep 2025 | Witbank, Mpumalanga",
          "   • Delivered excellent customer service",
          "   • Maintained stock accuracy",
          "",
          "3. We Whiten – Lead Generator",
          "   Nov 2024 – Jan 2025 | Remote, Texas, USA",
          "   • Engaged customers via social media",
          "   • Improved customer engagement",
          "",
        ]
        type = "success"
        break

      case "education":
        output = [
          "Education:",
          "",
          "Tshwane University of Technology",
          "2023 – Present",
          "National Diploma: Computer Science",
          "Major in Software Programming and Database Systems",
          "",
          "Umgnama Combined School",
          "2021 | National Senior Certificate (Bachelor's Pass)",
          "",
        ]
        type = "success"
        break

      case "contact":
        output = [
          "Contact Information:",
          "",
          "Email: sthembisosotsha@gmail.com",
          "       224834659@tut4life.ac.za",
          "Phone: 068 365 7773 / 060 743 1268",
          "Location: Tembisa, 1632, Gauteng",
          "",
          "Social:",
          "GitHub: github.com/SthembisoGit",
          "LinkedIn: linkedin.com/in/sthejourney",
          "",
        ]
        type = "success"
        break

      case "resume":
        output = ["Downloading resume...", ""]
        try {
          const res = await fetch("/api/resume/active")
          const data = await res.json()
          if (data.url) {
            window.open(data.url, "_blank")
            output.push("✓ Resume opened in new tab")
            type = "success"
          } else {
            output.push("No active resume found.")
            type = "error"
          }
        } catch (error) {
          output = ["Error downloading resume. Please try again later."]
          type = "error"
        }
        break

      case "stats":
        output = ["Fetching GitHub statistics...", ""]
        try {
          const res = await fetch("https://api.github.com/users/SthembisoGit")
          const data = await res.json()
          output.push(`GitHub Stats for @${data.login}:`)
          output.push("")
          output.push(`Public Repos: ${data.public_repos}`)
          output.push(`Followers: ${data.followers}`)
          output.push(`Following: ${data.following}`)
          output.push(`Public Gists: ${data.public_gists}`)
          output.push("")
          type = "success"
        } catch (error) {
          output = ["Error fetching GitHub stats. Please try again later."]
          type = "error"
        }
        break

      case "motivation":
        const quotes = [
          '"Code is like humor. When you have to explain it, it\'s bad." – Cory House',
          '"First, solve the problem. Then, write the code." – John Johnson',
          '"Experience is the name everyone gives to their mistakes." – Oscar Wilde',
          '"In order to be irreplaceable, one must always be different." – Coco Chanel',
          '"Java is to JavaScript what car is to Carpet." – Chris Heilmann',
          '"The best error message is the one that never shows up." – Thomas Fuchs',
          '"Simplicity is the soul of efficiency." – Austin Freeman',
        ]
        output = ["", quotes[Math.floor(Math.random() * quotes.length)], ""]
        type = "success"
        break

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
      className={`fixed z-50 border-2 border-cyan-500/50 bg-black/95 font-mono text-sm shadow-2xl shadow-cyan-500/50 backdrop-blur-sm transition-all ${isMinimized ? "bottom-24 right-6 h-14 w-80" : "bottom-24 right-6 h-[600px] w-[800px] max-w-[calc(100vw-3rem)]"
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
                  className={`mt-1 whitespace-pre-wrap ${cmd.type === "error" ? "text-red-400" : cmd.type === "success" ? "text-green-400" : "text-gray-300"
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
