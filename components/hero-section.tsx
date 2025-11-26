"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { ResumeDownloadButton } from "@/components/resume-download-button"
import { ParticleBackground } from "@/components/animations/particle-background"
import { GitHubStats } from "@/components/animations/github-stats"
import { AnimatedProfile } from "@/components/animations/animated-profile"
import { useEffect, useState, useRef } from "react"

// ✅ Enhanced TypingText: types forward only, smooth, no delete, cursor stays at end
function TypingText({ text, speed = 20 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("")
  const indexRef = useRef(0)

  useEffect(() => {
    if (indexRef.current >= text.length) return

    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, indexRef.current + 1))
      indexRef.current += 1
    }, speed)

    return () => clearTimeout(timer)
  }, [displayedText, text, speed])

  return (
    <span className="inline-block">
      {displayedText}
      <span className="ml-0.5 inline-block h-5 w-px animate-pulse bg-foreground align-text-bottom" />
    </span>
  )
}

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const parallaxX = windowSize.width
    ? (mousePosition.x - windowSize.width / 2) * 0.01
    : 0
  const parallaxY = windowSize.height
    ? (mousePosition.y - windowSize.height / 2) * 0.01
    : 0

  const bioText =
  "Motivated Computer Science final-year student with hands-on experience in IT support, troubleshooting, and software development. " +
  "Skilled in Java (OOP, Internet Programming – Servlets, JSP, JDBC, 3-Tier Architecture), Python, React, Node.js, SQL, TypeScript, and full-stack fundamentals. " +
  "Experienced in enterprise environments, customer-facing roles, and remote collaboration. " +
  "Eager to contribute technical expertise and problem-solving skills in a professional development environment.";
  
  return (
    <section id="home" className="relative min-h-screen pt-16">
      <ParticleBackground />

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/5 via-background to-purple-500/5 transition-transform duration-300"
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
          <div className="space-y-6">
            <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
              <AnimatedProfile />
            </div>

            <div className="inline-block animate-in fade-in slide-in-from-top-4 rounded-full border border-cyan-500/50 bg-card px-4 py-1.5 text-sm font-medium shadow-lg shadow-cyan-500/20 duration-1000 delay-100">
              Available for opportunities
            </div>

            <h1 className="animate-in fade-in slide-in-from-bottom-4 text-balance text-5xl font-bold tracking-tight duration-1000 sm:text-6xl lg:text-7xl">
              Hi, I'm <span className="font-code">Sthembiso Ndlovu</span>
            </h1>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
                {/* ✅ Use the improved TypingText with faster speed and no delete */}
                <TypingText text={bioText} speed={15} />
              </p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-wrap items-center justify-center gap-4 pt-4 duration-1000 delay-300">
              <Button size="lg" asChild className="group shadow-lg shadow-primary/20">
                <Link href="#contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="shadow-lg bg-transparent">
                <Link href="/projects">View Projects</Link>
              </Button>
              <ResumeDownloadButton />
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 flex items-center justify-center gap-4 pt-8 duration-1000 delay-500">
              <Link
                href="https://github.com/SthembisoGit"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full border border-cyan-500/50 bg-card p-3 shadow-lg shadow-cyan-500/20 transition-all hover:border-cyan-500 hover:shadow-cyan-500/40"
              >
                <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/sthejourney"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full border border-purple-500/50 bg-card p-3 shadow-lg shadow-purple-500/20 transition-all hover:border-purple-500 hover:shadow-purple-500/40"
              >
                <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:sthembisosotsha@gmail.com"
                className="group rounded-full border border-green-500/50 bg-card p-3 shadow-lg shadow-green-500/20 transition-all hover:border-green-500 hover:shadow-green-500/40"
              >
                <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">Email</span>
              </Link>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 pt-12 duration-1000 delay-700">
              <GitHubStats username="SthembisoGit" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}