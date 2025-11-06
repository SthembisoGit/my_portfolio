"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Trash2, CheckCircle } from "lucide-react"

interface Resume {
  id: string
  filename: string
  blob_url: string
  file_size: number
  is_active: boolean
  uploaded_at: string
}

export function ResumeList({ resumes }: { resumes: Resume[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [activatingId, setActivatingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return

    setDeletingId(id)
    try {
      const response = await fetch(`/api/resume/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert("Failed to delete resume")
      }
    } catch (error) {
      console.error("Error deleting resume:", error)
      alert("Failed to delete resume")
    } finally {
      setDeletingId(null)
    }
  }

  const handleSetActive = async (id: string) => {
    setActivatingId(id)
    try {
      const response = await fetch(`/api/resume/${id}/activate`, {
        method: "POST",
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert("Failed to set active resume")
      }
    } catch (error) {
      console.error("Error setting active resume:", error)
      alert("Failed to set active resume")
    } finally {
      setActivatingId(null)
    }
  }

  if (resumes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Resumes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">No resumes uploaded yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Resumes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumes.map((resume) => (
          <div key={resume.id} className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{resume.filename}</p>
                {resume.is_active && <Badge variant="default">Active</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">
                {(resume.file_size / 1024).toFixed(2)} KB • {new Date(resume.uploaded_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              {!resume.is_active && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetActive(resume.id)}
                  disabled={activatingId === resume.id}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Set Active
                </Button>
              )}
              <Button variant="outline" size="icon" asChild>
                <a href={resume.blob_url} target="_blank" rel="noopener noreferrer" download>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(resume.id)}
                disabled={deletingId === resume.id}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
