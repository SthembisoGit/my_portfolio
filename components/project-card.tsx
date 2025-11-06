"use client"

import type React from "react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github_url?: string
  live_url?: string
  image_url?: string
  featured?: boolean
}

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured }: ProjectCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -10
    const tiltY = ((x - centerX) / centerX) * 10

    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <Card
      className="group flex h-full flex-col overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {project.image_url && (
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={project.image_url || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">{project.title}</h3>
          {featured && (
            <Badge variant="default" className="shrink-0 shadow-lg shadow-primary/20">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 4).map((tech, index) => (
            <Badge
              key={tech}
              variant="secondary"
              className="animate-in fade-in slide-in-from-bottom-2 transition-all hover:scale-105"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "backwards",
              }}
            >
              {tech}
            </Badge>
          ))}
          {project.technologies?.length > 4 && <Badge variant="secondary">+{project.technologies.length - 4}</Badge>}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
          <Link href={`/projects/${project.id}`}>View Details</Link>
        </Button>
        {project.github_url && (
          <Button variant="ghost" size="icon" asChild className="transition-all hover:scale-110 hover:text-cyan-500">
            <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        )}
        {project.live_url && (
          <Button variant="ghost" size="icon" asChild className="transition-all hover:scale-110 hover:text-green-500">
            <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Live Demo</span>
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
