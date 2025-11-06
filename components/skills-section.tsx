"use client"

import { Card } from "@/components/ui/card"
import { Code2, Database, Globe, Server, Wrench, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["Java", "Python", "JavaScript", "HTML/CSS", "SQL"],
    color: "cyan",
  },
  {
    title: "Backend & APIs",
    icon: Server,
    skills: ["REST APIs", "OOP", "SDLC", "System Analysis"],
    color: "purple",
  },
  {
    title: "Database Management",
    icon: Database,
    skills: ["SQL", "PostgreSQL", "Database Design", "Query Optimization"],
    color: "green",
  },
  {
    title: "Development Tools",
    icon: Wrench,
    skills: ["Git & Version Control", "Linux", "POS Systems", "Customer Service Tools"],
    color: "cyan",
  },
  {
    title: "Web Technologies",
    icon: Globe,
    skills: ["Full-Stack Development", "React", "Next.js", "Tailwind CSS"],
    color: "purple",
  },
  {
    title: "Soft Skills",
    icon: Users,
    skills: ["Problem Solving", "Team Collaboration", "Communication", "Time Management", "Adaptability"],
    color: "green",
  },
]

const colorClasses = {
  cyan: {
    border: "hover:border-cyan-500/50",
    bg: "group-hover:bg-cyan-500/20",
    text: "text-cyan-500",
    shadow: "hover:shadow-cyan-500/20",
  },
  purple: {
    border: "hover:border-purple-500/50",
    bg: "group-hover:bg-purple-500/20",
    text: "text-purple-500",
    shadow: "hover:shadow-purple-500/20",
  },
  green: {
    border: "hover:border-green-500/50",
    bg: "group-hover:bg-green-500/20",
    text: "text-green-500",
    shadow: "hover:shadow-green-500/20",
  },
}

export function SkillsSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index])
            }, index * 100)
          }
        },
        { threshold: 0.1 },
      )

      if (ref) observer.observe(ref)
      return observer
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills & Expertise</h2>
          <p className="mt-4 text-lg text-muted-foreground">Technologies and tools I work with</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            const colors = colorClasses[category.color as keyof typeof colorClasses]
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={category.title}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className={`transition-all duration-500 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <Card
                  className={`group relative overflow-hidden border-2 bg-card/50 p-6 backdrop-blur-sm transition-all hover:shadow-lg ${colors.border} ${colors.shadow}`}
                >
                  <div
                    className={`absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20 ${
                      category.color === "cyan"
                        ? "bg-cyan-500"
                        : category.color === "purple"
                          ? "bg-purple-500"
                          : "bg-green-500"
                    }`}
                  />

                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`rounded-lg bg-${category.color}-500/10 p-2 transition-all duration-300 ${colors.bg}`}
                    >
                      <Icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skill}
                        className="animate-in fade-in slide-in-from-bottom-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground transition-all hover:scale-105 hover:bg-secondary/80"
                        style={{
                          animationDelay: `${isVisible ? skillIndex * 50 : 0}ms`,
                          animationFillMode: "backwards",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
