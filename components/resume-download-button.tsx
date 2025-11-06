"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function ResumeDownloadButton() {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchActiveResume = async () => {
      try {
        const response = await fetch("/api/resume/active")
        if (response.ok) {
          const data = await response.json()
          setResumeUrl(data.blob_url)
        }
      } catch (error) {
        console.error("Failed to fetch resume:", error)
      }
    }

    fetchActiveResume()
  }, [])

  if (!resumeUrl) return null

  return (
    <Button variant="outline" asChild>
      <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
        <Download className="mr-2 h-4 w-4" />
        Download Resume
      </a>
    </Button>
  )
}
