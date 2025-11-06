"use client"

import { Card } from "@/components/ui/card"
import { Calendar, Code, Award, Briefcase } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface TimelineEvent {
  date: string
  title: string
  description: string
  type: "project" | "skill" | "achievement" | "work"
  technologies?: string[]
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "2023-01",
    title: "Started Computer Science Diploma",
    description: "Began National Diploma in Computer Science at Tshwane University of Technology",
    type: "achievement",
  },
  {
    date: "2023-06",
    title: "Learned Java Programming",
    description: "Mastered OOP concepts and built first Java applications",
    type: "skill",
    technologies: ["Java", "OOP", "SDLC"],
  },
  {
    date: "2024-01",
    title: "Database Systems Course",
    description: "Completed advanced SQL and database design coursework",
    type: "skill",
    technologies: ["SQL", "PostgreSQL", "Database Design"],
  },
  {
    date: "2024-03",
    title: "Outdoor Warehouse - Sales Assistant",
    description: "Started part-time role developing customer service and sales skills",
    type: "work",
  },
  {
    date: "2024-06",
    title: "Full-Stack Development Projects",
    description: "Built multiple web applications using modern frameworks",
    type: "project",
    technologies: ["JavaScript", "React", "Next.js", "REST APIs"],
  },
  {
    date: "2024-11",
    title: "Remote Lead Generator",
    description: "International remote work experience with We Whiten (USA)",
    type: "work",
  },
  {
    date: "2025-01",
    title: "Advanced System Analysis",
    description: "Completed system analysis and design coursework",
    type: "skill",
    technologies: ["System Analysis", "UML", "Requirements Engineering"],
  },
  {
    date: "2025-09",
    title: "Denel Aerospace - IT Intern",
    description: "Started Work Integrated Learning (WIL) in enterprise IT environment",
    type: "work",
  },
]

export function ProjectTimeline() {
  const [visibleEvents, setVisibleEvents] = useState<number[]>([])
  const eventRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = eventRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleEvents((prev) => [...prev, index])
            }, index * 150)
          }
        },
        { threshold: 0.1 },
      )

      if (ref) observer.observe(ref)
      return observer
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "project":
        return Code
      case "skill":
        return Award
      case "work":
        return Briefcase
      default:
        return Calendar
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "project":
        return "cyan"
      case "skill":
        return "purple"
      case "work":
        return "green"
      default:
        return "blue"
    }
  }

  return (
    <Card className="border-2 border-purple-500/20 bg-card/50 p-6 backdrop-blur-sm">
      <h3 className="mb-8 text-center text-2xl font-bold">My Journey</h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-green-500 opacity-30" />

        <div className="space-y-8">
          {timelineEvents.map((event, index) => {
            const Icon = getIcon(event.type)
            const color = getColor(event.type)
            const isVisible = visibleEvents.includes(index)

            return (
              <div
                key={index}
                ref={(el) => {
                  eventRefs.current[index] = el
                }}
                className={`relative pl-20 transition-all duration-500 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
              >
                {/* Icon */}
                <div
                  className={`absolute left-4 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    color === "cyan"
                      ? "border-cyan-500 bg-cyan-500/20"
                      : color === "purple"
                        ? "border-purple-500 bg-purple-500/20"
                        : "border-green-500 bg-green-500/20"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      color === "cyan" ? "text-cyan-400" : color === "purple" ? "text-purple-400" : "text-green-400"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="group rounded-lg border border-border/50 bg-card/30 p-4 transition-all hover:border-border hover:bg-card/50">
                  <div className="mb-1 text-sm text-muted-foreground">{event.date}</div>
                  <h4 className="mb-2 text-lg font-semibold">{event.title}</h4>
                  <p className="mb-3 text-sm text-muted-foreground">{event.description}</p>

                  {event.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {event.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            color === "cyan"
                              ? "bg-cyan-500/10 text-cyan-400"
                              : color === "purple"
                                ? "bg-purple-500/10 text-purple-400"
                                : "bg-green-500/10 text-green-400"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
