"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const knowledgeBase = {
  skills: "Java, Python, JavaScript, HTML/CSS, SQL, REST APIs, Git, Linux, System Analysis",
  experience:
    "IT Intern at Denel Aerospace (Sep 2025-Present), Sales Assistant at Outdoor Warehouse (Mar 2024-Sep 2025), Lead Generator at We Whiten (Nov 2024-Jan 2025)",
  education: "National Diploma in Computer Science at Tshwane University of Technology (2023-Present)",
  location: "Tembisa, Gauteng, South Africa",
  email: "sthembisosotsha@gmail.com",
  github: "github.com/SthembisoGit",
  linkedin: "linkedin.com/in/sthejourney",
  availability: "Currently completing WIL, available for full-time opportunities from 2026",
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Sthembiso's AI assistant. Ask me anything about his skills, experience, projects, or availability!",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Skills-related questions
    if (lowerMessage.match(/\b(skill|technology|tech|know|language|framework|tool)\b/)) {
      if (lowerMessage.includes("java")) {
        return "Yes! Sthembiso is proficient in Java. He has experience with OOP, data structures, and building backend applications. Java is one of his primary languages."
      }
      if (lowerMessage.includes("python")) {
        return "Sthembiso knows Python and uses it for scripting, data analysis, and backend development."
      }
      if (lowerMessage.includes("javascript") || lowerMessage.includes("js")) {
        return "Yes, Sthembiso is skilled in JavaScript, including modern ES6+ features, React, and Node.js for full-stack development."
      }
      if (lowerMessage.includes("sql") || lowerMessage.includes("database")) {
        return "Sthembiso has strong SQL and database management skills. He's worked with PostgreSQL, MySQL, and Supabase, and understands database design, optimization, and RLS policies."
      }
      return `Sthembiso is proficient in: ${knowledgeBase.skills}. He has strong experience in full-stack development, database management, and system analysis. Would you like to know about a specific technology?`
    }

    // Experience-related questions
    if (lowerMessage.match(/\b(experience|work|job|intern|denel|warehouse)\b/)) {
      if (lowerMessage.includes("denel")) {
        return "Sthembiso is currently completing his Work Integrated Learning (WIL) at Denel Aerospace as an IT Intern (Sep 2025-Present). He provides IT and administrative support, system monitoring, and technical documentation."
      }
      if (lowerMessage.includes("warehouse") || lowerMessage.includes("outdoor")) {
        return "Sthembiso worked as a Sales Assistant at Outdoor Warehouse (Mar 2024-Sep 2025) where he delivered excellent customer service and maintained stock accuracy."
      }
      if (lowerMessage.includes("remote") || lowerMessage.includes("whiten")) {
        return "Sthembiso worked remotely as a Lead Generator for We Whiten (Nov 2024-Jan 2025), a company based in Texas, USA. He engaged customers via social media and improved customer engagement."
      }
      return `Sthembiso's work experience includes: ${knowledgeBase.experience}. He's gained valuable experience in IT support, customer service, and remote work. Would you like details about a specific role?`
    }

    // Education-related questions
    if (lowerMessage.match(/\b(education|study|university|degree|tut|tshwane)\b/)) {
      return `${knowledgeBase.education}. He's completed all academic modules and is currently finishing his Work Integrated Learning (WIL) at Denel Aerospace. His major is in Software Programming and Database Systems.`
    }

    // Contact-related questions
    if (lowerMessage.match(/\b(contact|email|reach|phone|call|message)\b/)) {
      return `You can reach Sthembiso at:\n\nEmail: ${knowledgeBase.email} or 224834659@tut4life.ac.za\nPhone: 068 365 7773 / 060 743 1268\nLinkedIn: ${knowledgeBase.linkedin}\nGitHub: ${knowledgeBase.github}\n\nFeel free to connect on any platform!`
    }

    // Availability-related questions
    if (lowerMessage.match(/\b(available|hire|start|when|full-time|job)\b/)) {
      return `${knowledgeBase.availability}. He's actively seeking opportunities in software development, particularly in full-stack or backend roles. He's available weekdays 9 AM - 6 PM SAST for interviews and calls.`
    }

    // Location-related questions
    if (lowerMessage.match(/\b(location|where|based|live|from)\b/)) {
      return `Sthembiso is based in ${knowledgeBase.location}. He's open to both on-site opportunities in Gauteng and remote positions.`
    }

    // Project-related questions
    if (lowerMessage.match(/\b(project|portfolio|built|created|developed)\b/)) {
      return "Sthembiso has worked on various projects including full-stack web applications, database systems, and REST APIs. Check out the Projects section on this portfolio to see his work in detail, including live demos and GitHub repositories!"
    }

    // Greeting
    if (lowerMessage.match(/\b(hello|hi|hey|greet)\b/)) {
      return "Hello! I'm here to help you learn more about Sthembiso. Feel free to ask about his skills, experience, education, projects, or how to get in touch!"
    }

    // Specific "what" questions
    if (lowerMessage.startsWith("what")) {
      if (lowerMessage.includes("do") || lowerMessage.includes("does")) {
        return "Sthembiso is a Computer Science student and Software Development Intern specializing in full-stack development, database management, and system analysis. He's currently completing his WIL at Denel Aerospace."
      }
    }

    // Specific "can" questions
    if (lowerMessage.startsWith("can")) {
      return "Sthembiso can build full-stack web applications, design and optimize databases, create REST APIs, and work with modern technologies like React, Node.js, Java, Python, and SQL. What specific capability are you interested in?"
    }

    // Default response
    return "I can help you learn about Sthembiso's skills, experience, education, projects, and availability. What would you like to know? Try asking specific questions like 'Does he know Java?' or 'What's his experience?'"
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response = generateResponse(input)
      const assistantMessage: Message = { role: "assistant", content: response }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg transition-all hover:scale-110 hover:shadow-cyan-500/50"
      >
        <Bot className="h-6 w-6 text-white" />
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all ${
        isMinimized ? "h-14 w-64" : "h-[600px] w-96"
      } max-w-[calc(100vw-3rem)]`}
    >
      <Card className="flex h-full flex-col border-2 border-cyan-500/30 bg-card/95 backdrop-blur-sm">
        {/* ... existing code for header and messages ... */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold">AI Assistant</div>
              <div className="text-xs text-muted-foreground">Ask me anything</div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] whitespace-pre-line rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-cyan-500/20 text-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-lg bg-secondary p-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about skills, experience..."
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
                <Button onClick={handleSend} size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
