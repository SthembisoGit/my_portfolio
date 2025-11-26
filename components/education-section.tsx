"use client"

import { Card } from "@/components/ui/card"
import { GraduationCap, Languages } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const education = [
  {
    degree: "National Diploma: Computer Science",
    institution: "Tshwane University of Technology",
    location: "Emalahleni, South Africa",
    period: "2023 – Present",
    achievements: [
      "Major in Software Programming and Database Systems",
      "All academic modules completed",
      "Currently completing Work Integrated Learning (WIL)",
    ],
  },
  {
    degree: "National Senior Certificate (Bachelor's Pass)",
    institution: "Umgnama Combined School",
    location: "Pongola, South Africa",
    period: "2021",
    achievements: [
      "Subjects: Mathematics, Life Sciences, Geography, Agricultural Sciences, IsiZulu HL, English FAL, Life Orientation",
     
    ],
  },
]

const languages = [
  {
    language: "IsiZulu",
    proficiency: "Native",
  },
  {
    language: "English",
    proficiency: "Good",
  },
]

export function EducationSection() {
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
    <section id="education" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Education & Languages</h2>
          <p className="mt-4 text-lg text-muted-foreground">Academic background and language proficiency</p>
        </div>

        <div className="space-y-8">
          {/* Education */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold">Education</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card
                  key={index}
                  className="group animate-in fade-in slide-in-from-bottom-4 border-l-4 border-l-primary bg-card p-6 duration-700"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 transition-all group-hover:bg-primary/20">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold">{edu.degree}</h4>
                      <p className="text-lg text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">
                        {edu.location} • {edu.period}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span className="text-primary">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold">Languages</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {languages.map((lang, index) => {
                const isVisible = visibleCards.includes(index)
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      cardRefs.current[index] = el
                    }}
                    className={`transition-all duration-500 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <Card className="group relative overflow-hidden border-2 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20">
                      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-green-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="mb-3 flex items-center gap-2">
                        <Languages className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                      </div>
                      <h4 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
                        {lang.language}
                      </h4>
                      <p className="text-sm text-muted-foreground">{lang.proficiency}</p>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
