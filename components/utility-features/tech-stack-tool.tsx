"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

interface ProjectType {
  name: string
  description: string
  stacks: {
    name: string
    technologies: string[]
    reasoning: string
  }[]
}

const projectTypes: ProjectType[] = [
  {
    name: "E-Commerce Website",
    description: "Full-featured online store with payments",
    stacks: [
      {
        name: "Modern Stack",
        technologies: ["Next.js", "React", "PostgreSQL", "Stripe", "Tailwind CSS"],
        reasoning: "Next.js for SEO and performance, PostgreSQL for reliable transactions, Stripe for secure payments",
      },
      {
        name: "Traditional Stack",
        technologies: ["Java Spring Boot", "MySQL", "Thymeleaf", "Bootstrap"],
        reasoning: "Enterprise-grade reliability with Spring Boot, proven MySQL database, server-side rendering",
      },
    ],
  },
  {
    name: "REST API Backend",
    description: "Scalable API for mobile/web apps",
    stacks: [
      {
        name: "Node.js Stack",
        technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Redis"],
        reasoning: "Fast async I/O with Node.js, PostgreSQL for data integrity, Redis for caching and sessions",
      },
      {
        name: "Java Stack",
        technologies: ["Java Spring Boot", "MySQL", "Spring Security", "Hibernate"],
        reasoning: "Type-safe with Java, robust Spring ecosystem, excellent ORM with Hibernate",
      },
    ],
  },
  {
    name: "Real-Time Chat App",
    description: "Instant messaging with presence",
    stacks: [
      {
        name: "WebSocket Stack",
        technologies: ["Next.js", "Socket.io", "Redis", "PostgreSQL", "React"],
        reasoning:
          "Socket.io for real-time bidirectional communication, Redis for pub/sub, PostgreSQL for message history",
      },
      {
        name: "Supabase Stack",
        technologies: ["Next.js", "Supabase Realtime", "PostgreSQL", "React"],
        reasoning: "Supabase provides real-time subscriptions out of the box, integrated auth and database",
      },
    ],
  },
  {
    name: "Data Dashboard",
    description: "Analytics and visualization platform",
    stacks: [
      {
        name: "Modern Analytics",
        technologies: ["Next.js", "React", "Recharts", "PostgreSQL", "Python"],
        reasoning: "React for interactive UI, Recharts for visualizations, Python for data processing",
      },
      {
        name: "Full Python",
        technologies: ["Django", "PostgreSQL", "Pandas", "Plotly", "Celery"],
        reasoning: "Python ecosystem for data science, Django for rapid development, Celery for background jobs",
      },
    ],
  },
]

export function TechStackTool() {
  const [selectedProject, setSelectedProject] = useState(0)
  const [selectedStack, setSelectedStack] = useState(0)

  const project = projectTypes[selectedProject]
  const stack = project.stacks[selectedStack]

  return (
    <Card className="border-2 border-cyan-500/20 bg-card/50 p-6 backdrop-blur-sm">
      <h3 className="mb-6 text-xl font-bold">Tech Stack Comparison Tool</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        See how I would architect different types of applications with appropriate technology choices
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Project Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Type</label>
          {projectTypes.map((type, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedProject(index)
                setSelectedStack(0)
              }}
              className={`w-full rounded-lg border p-3 text-left transition-all ${
                selectedProject === index
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-border bg-card/30 hover:border-cyan-500/50"
              }`}
            >
              <div className="mb-1 font-semibold">{type.name}</div>
              <div className="text-xs text-muted-foreground">{type.description}</div>
            </button>
          ))}
        </div>

        {/* Stack Options */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Stack Options</label>
          {project.stacks.map((s, index) => (
            <button
              key={index}
              onClick={() => setSelectedStack(index)}
              className={`w-full rounded-lg border p-3 text-left transition-all ${
                selectedStack === index
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-border bg-card/30 hover:border-purple-500/50"
              }`}
            >
              <div className="mb-2 font-semibold">{s.name}</div>
              <div className="flex flex-wrap gap-1">
                {s.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="rounded bg-secondary px-2 py-0.5 text-xs">
                    {tech}
                  </span>
                ))}
                {s.technologies.length > 3 && (
                  <span className="rounded bg-secondary px-2 py-0.5 text-xs">+{s.technologies.length - 3}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Stack Details */}
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Technologies</label>
            <div className="space-y-2">
              {stack.technologies.map((tech) => (
                <div key={tech} className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/30 p-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Why This Stack?</label>
            <p className="rounded-lg border border-border/50 bg-card/30 p-3 text-sm text-muted-foreground">
              {stack.reasoning}
            </p>
          </div>

          <Button className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700">
            <ArrowRight className="mr-2 h-4 w-4" />
            Build This Stack
          </Button>
        </div>
      </div>
    </Card>
  )
}
