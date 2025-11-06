"use client"

import { useEffect, useState } from "react"
import { GitCommit, Clock } from "lucide-react"

interface GitHubEvent {
  type: string
  repo: { name: string }
  created_at: string
  payload: any
}

export function GitHubActivity({ username = "sthembiso" }: { username?: string }) {
  const [activity, setActivity] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=5`)
        const events = await response.json()

        if (Array.isArray(events)) {
          setActivity(events)
        }
      } catch (error) {
        console.error("Failed to fetch GitHub activity:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
    const interval = setInterval(fetchActivity, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [username])

  const getEventDescription = (event: GitHubEvent) => {
    switch (event.type) {
      case "PushEvent":
        return `Pushed ${event.payload.commits?.length || 0} commit(s) to ${event.repo.name}`
      case "CreateEvent":
        return `Created ${event.payload.ref_type} in ${event.repo.name}`
      case "PullRequestEvent":
        return `${event.payload.action} pull request in ${event.repo.name}`
      case "IssuesEvent":
        return `${event.payload.action} issue in ${event.repo.name}`
      default:
        return `Activity in ${event.repo.name}`
    }
  }

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 animate-pulse rounded bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2 font-mono text-sm">
      <div className="mb-3 flex items-center gap-2 text-green-500">
        <GitCommit className="h-4 w-4" />
        <span>Recent Activity</span>
      </div>
      {activity.slice(0, 5).map((event, index) => (
        <div
          key={index}
          className="animate-in fade-in slide-in-from-left-2 flex items-start gap-2 text-xs text-muted-foreground"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: "backwards",
          }}
        >
          <span className="text-green-500">›</span>
          <div className="flex-1">
            <p className="text-foreground">{getEventDescription(event)}</p>
            <div className="mt-1 flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3" />
              <span>{getTimeAgo(event.created_at)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
