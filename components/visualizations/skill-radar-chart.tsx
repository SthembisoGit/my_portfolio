"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

interface SkillData {
  skill: string
  level: number
  yearsExperience: number
  projects: number
}

const skillsData: SkillData[] = [
  { skill: "Java", level: 85, yearsExperience: 3, projects: 8 },
  { skill: "Python", level: 75, yearsExperience: 2, projects: 5 },
  { skill: "JavaScript", level: 80, yearsExperience: 2, projects: 10 },
  { skill: "SQL", level: 85, yearsExperience: 3, projects: 12 },
  { skill: "Git", level: 80, yearsExperience: 2, projects: 15 },
  { skill: "REST APIs", level: 75, yearsExperience: 2, projects: 7 },
]

export function SkillRadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = Math.min(centerX, centerY) - 60
    const numSkills = skillsData.length
    const angleStep = (Math.PI * 2) / numSkills

    // Animation
    let animationProgress = 0
    const animate = () => {
      if (animationProgress < 1) {
        animationProgress += 0.02
        requestAnimationFrame(animate)
      }
      drawChart(animationProgress)
    }

    const drawChart = (progress: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background circles
      ctx.strokeStyle = "rgba(100, 100, 100, 0.2)"
      ctx.lineWidth = 1
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, (maxRadius / 5) * i, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw axes
      ctx.strokeStyle = "rgba(100, 100, 100, 0.3)"
      ctx.lineWidth = 1
      skillsData.forEach((_, index) => {
        const angle = angleStep * index - Math.PI / 2
        const x = centerX + Math.cos(angle) * maxRadius
        const y = centerY + Math.sin(angle) * maxRadius
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.stroke()
      })

      // Draw skill polygon
      ctx.beginPath()
      skillsData.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2
        const radius = (skill.level / 100) * maxRadius * progress
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.closePath()

      // Fill with gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius)
      gradient.addColorStop(0, "rgba(6, 182, 212, 0.3)")
      gradient.addColorStop(1, "rgba(168, 85, 247, 0.1)")
      ctx.fillStyle = gradient
      ctx.fill()

      // Stroke
      ctx.strokeStyle = "rgba(6, 182, 212, 0.8)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw points and labels
      skillsData.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2
        const radius = (skill.level / 100) * maxRadius * progress
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        // Draw point
        ctx.beginPath()
        ctx.arc(x, y, hoveredIndex === index ? 8 : 5, 0, Math.PI * 2)
        ctx.fillStyle = hoveredIndex === index ? "rgba(168, 85, 247, 1)" : "rgba(6, 182, 212, 1)"
        ctx.fill()

        // Draw label
        const labelX = centerX + Math.cos(angle) * (maxRadius + 40)
        const labelY = centerY + Math.sin(angle) * (maxRadius + 40)
        ctx.fillStyle = hoveredIndex === index ? "#a855f7" : "#fff"
        ctx.font = hoveredIndex === index ? "bold 14px sans-serif" : "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(skill.skill, labelX, labelY)
      })
    }

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      let foundIndex: number | null = null

      skillsData.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2
        const radius = (skill.level / 100) * maxRadius
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2)
        if (distance < 15) {
          foundIndex = index
        }
      })

      setHoveredIndex(foundIndex)
      if (foundIndex !== null) {
        setSelectedSkill(skillsData[foundIndex])
      }
    }

    const handleMouseLeave = () => {
      setHoveredIndex(null)
      setSelectedSkill(null)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    animate()

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hoveredIndex])

  return (
    <Card className="border-2 border-cyan-500/20 bg-card/50 p-6 backdrop-blur-sm">
      <h3 className="mb-4 text-center text-xl font-bold">Skill Proficiency Radar</h3>
      <div className="flex flex-col items-center gap-4 lg:flex-row">
        <canvas ref={canvasRef} width={400} height={400} className="max-w-full" />
        {selectedSkill && (
          <div className="w-full rounded-lg border border-purple-500/30 bg-purple-500/10 p-4 lg:w-64">
            <h4 className="mb-2 text-lg font-bold text-purple-400">{selectedSkill.skill}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Proficiency:</span>
                <span className="font-semibold text-cyan-400">{selectedSkill.level}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Experience:</span>
                <span className="font-semibold text-cyan-400">{selectedSkill.yearsExperience} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Projects:</span>
                <span className="font-semibold text-cyan-400">{selectedSkill.projects}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
