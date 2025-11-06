"use client"

import { Card } from "@/components/ui/card"
import { Briefcase, Calendar } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const experiences = [
  {
    title: "IT Intern (WIL)",
    company: "Denel Aerospace",
    location: "Kempton Park, Gauteng, South Africa",
    period: "Sep 2025 – Present",
    description: [
      "Completing Work Integrated Learning (WIL) as part of Computer Science qualification",
      "Provide IT and administrative support, including system monitoring and technical documentation",
      "Assist with troubleshooting and escalating issues, following professional workflows",
      "Collaborate with cross-functional teams, gaining exposure to enterprise-level environments",
      "Developed adaptability, problem-solving and process understanding transferable to software development roles",
    ],
  },
  {
    title: "Sales Assistant (Flexi)",
    company: "Outdoor Warehouse",
    location: "Witbank, Mpumalanga, South Africa",
    period: "Mar 2024 – Sep 2025",
    description: [
      "Delivered excellent customer service by assisting clients with product selection and purchases",
      "Promoted outdoor and leisure products to support sales targets",
      "Maintained stock accuracy and ensured merchandise was well-presented and priced",
    ],
  },
  {
    title: "Lead Generator",
    company: "We Whiten",
    location: "Remote, Texas, USA",
    period: "Nov 2024 – Jan 2025",
    description: [
      "Engaged potential customers via social media platforms to generate leads and build brand awareness",
      "Improved customer engagement through timely and professional responses",
      "Gained remote work discipline, self-management, and digital communication skills",
    ],
  },
]

export function ExperienceSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index])
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

  return (
    <section id="experience" className="relative bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Work Experience</h2>
          <p className="mt-4 text-lg text-muted-foreground">My professional journey in software development</p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => {
            const isVisible = visibleCards.includes(index)
            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
              >
                <Card className="group relative overflow-hidden border-l-4 border-l-primary bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/0 via-purple-500/5 to-green-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 transition-all group-hover:bg-primary/20">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                            {exp.title}
                          </h3>
                          <p className="text-lg text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.location}</p>
                        </div>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {exp.description.map((item, i) => (
                          <li
                            key={i}
                            className="animate-in fade-in slide-in-from-left-2 flex gap-2 text-sm"
                            style={{
                              animationDelay: `${isVisible ? (i + 1) * 100 : 0}ms`,
                              animationFillMode: "backwards",
                            }}
                          >
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground md:flex-col md:items-end">
                      <Calendar className="h-4 w-4" />
                      <span className="whitespace-nowrap">{exp.period}</span>
                    </div>
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
