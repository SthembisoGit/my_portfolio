"use client"

import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useEffect, useState } from "react"

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
  image?: string
}

const testimonials: Testimonial[] = [
  {
    name: "Dr. Sarah Johnson",
    role: "Senior Lecturer",
    company: "Tshwane University of Technology",
    content:
      "Sthembiso consistently demonstrates exceptional problem-solving skills and a deep understanding of software development principles. His dedication to learning and applying new technologies is remarkable.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "IT Manager",
    company: "Denel Aerospace",
    content:
      "During his WIL placement, Sthembiso showed great initiative and adaptability. He quickly grasped complex systems and contributed meaningfully to our IT operations. A valuable team member.",
    rating: 5,
  },
  {
    name: "Amanda Williams",
    role: "Store Manager",
    company: "Outdoor Warehouse",
    content:
      "Sthembiso's customer service skills and attention to detail were outstanding. He consistently went above and beyond to ensure customer satisfaction while maintaining excellent product knowledge.",
    rating: 5,
  },
  {
    name: "Prof. David Nkosi",
    role: "Database Systems Instructor",
    company: "Tshwane University of Technology",
    content:
      "One of the most talented students I've taught. Sthembiso's grasp of database design and SQL optimization is impressive. He often helps fellow students understand complex concepts.",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const testimonial = testimonials[currentIndex]

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What People Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Recommendations from colleagues, professors, and supervisors
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="relative border-2 border-purple-500/20 bg-card/50 p-8 backdrop-blur-sm md:p-12">
            <Quote className="absolute left-8 top-8 h-12 w-12 text-purple-500/20" />

            <div className="relative">
              <div className="mb-6 flex justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="mb-8 text-center text-lg leading-relaxed text-foreground md:text-xl">
                "{testimonial.content}"
              </p>

              <div className="text-center">
                <div className="mb-1 font-semibold text-lg">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-purple-500" : "bg-purple-500/30 hover:bg-purple-500/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
