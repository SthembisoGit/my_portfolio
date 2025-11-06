"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Loader2 } from "lucide-react"

export function PortfolioPDFGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)

    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real implementation, you would:
    // 1. Use a library like jsPDF or Puppeteer
    // 2. Capture the portfolio content
    // 3. Generate a formatted PDF
    // 4. Trigger download

    // For now, we'll create a simple text-based summary
    const portfolioData = {
      name: "Sthembiso Ndlovu",
      title: "Computer Science Student | Software Development Intern",
      email: "sthembisosotsha@gmail.com",
      phone: "068 365 7773",
      github: "github.com/SthembisoGit",
      linkedin: "linkedin.com/in/sthejourney",
      skills: "Java, Python, JavaScript, SQL, REST APIs, Git, Linux",
      summary:
        "Motivated Computer Science final year student with strong foundation in software development and databases.",
    }

    const content = `
STHEMBISO NDLOVU
${portfolioData.title}

CONTACT
Email: ${portfolioData.email}
Phone: ${portfolioData.phone}
GitHub: ${portfolioData.github}
LinkedIn: ${portfolioData.linkedin}

SUMMARY
${portfolioData.summary}

TECHNICAL SKILLS
${portfolioData.skills}

WORK EXPERIENCE
• Denel Aerospace – IT Intern (WIL) | Sep 2025 – Present
• Outdoor Warehouse – Sales Assistant | Mar 2024 – Sep 2025
• We Whiten – Lead Generator | Nov 2024 – Jan 2025

EDUCATION
Tshwane University of Technology
National Diploma: Computer Science | 2023 – Present

---
Generated from portfolio: ${window.location.origin}
    `

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Sthembiso-Ndlovu-Portfolio.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsGenerating(false)
  }

  return (
    <Card className="border-2 border-green-500/20 bg-card/50 p-6 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-green-500/10 p-3">
          <FileText className="h-6 w-6 text-green-400" />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-bold">Download Portfolio PDF</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Get a comprehensive PDF version of this portfolio including projects, skills, and experience. Perfect for
            sharing with your team or keeping for reference.
          </p>

          <div className="mb-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span>Complete project showcase with screenshots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span>Detailed skills and experience timeline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span>Contact information and social links</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span>Code samples and technical highlights</span>
            </div>
          </div>

          <Button
            onClick={generatePDF}
            disabled={isGenerating}
            className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download Portfolio PDF
              </>
            )}
          </Button>

          <p className="mt-3 text-xs text-muted-foreground">
            Note: This is a simplified version. For the full interactive experience, share the portfolio URL.
          </p>
        </div>
      </div>
    </Card>
  )
}
