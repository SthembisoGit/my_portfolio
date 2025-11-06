"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export function ContributionHeatmap({ username = "SthembisoGit" }: { username?: string }) {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)
  const [stats, setStats] = useState({ total: 0, max: 0, streak: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const query = `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        }

        if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
          headers["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
        }

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers,
          body: JSON.stringify({
            query,
            variables: { username },
          }),
        })

        if (response.status === 403) {
          setError("rate_limit")
          setLoading(false)
          return
        }

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const result = await response.json()

        if (result.errors) {
          throw new Error(result.errors[0]?.message || "GraphQL error")
        }

        if (result.data?.user?.contributionsCollection) {
          const calendar = result.data.user.contributionsCollection.contributionCalendar
          const allDays: ContributionDay[] = []
          let total = 0
          let max = 0
          let currentStreak = 0
          let maxStreak = 0

          calendar.weeks.forEach((week: any) => {
            week.contributionDays.forEach((day: any) => {
              const count = day.contributionCount
              const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4

              allDays.push({
                date: day.date,
                count,
                level: level as 0 | 1 | 2 | 3 | 4,
              })

              total += count
              max = Math.max(max, count)

              if (count > 0) {
                currentStreak++
                maxStreak = Math.max(maxStreak, currentStreak)
              } else {
                currentStreak = 0
              }
            })
          })

          setContributions(allDays)
          setStats({ total, max, streak: maxStreak })
        }
      } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error)
        setError("fetch_failed")
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [username])

  const getLevelColor = (level: number) => {
    const colors = ["bg-gray-800/50", "bg-green-900/50", "bg-green-700/70", "bg-green-500/80", "bg-green-400"]
    return colors[level]
  }

  if (loading) {
    return (
      <Card className="border-2 border-green-500/20 bg-card/50 p-6 backdrop-blur-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 rounded bg-muted" />
          <div className="h-24 rounded bg-muted" />
        </div>
      </Card>
    )
  }

  if (error === "rate_limit") {
    return (
      <Card className="border-2 border-yellow-500/20 bg-card/50 p-6 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
          <div>
            <h3 className="mb-2 text-xl font-bold">GitHub API Rate Limit Reached</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              The contribution heatmap is temporarily unavailable due to GitHub API rate limits.
            </p>
            <p className="text-xs text-muted-foreground">
              To fix this, add a <code className="rounded bg-muted px-1 py-0.5">NEXT_PUBLIC_GITHUB_TOKEN</code>{" "}
              environment variable with a GitHub Personal Access Token.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  if (error === "fetch_failed" || contributions.length === 0) {
    return (
      <Card className="border-2 border-green-500/20 bg-card/50 p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-xl font-bold">Contribution Activity</h3>
        <p className="text-sm text-muted-foreground">
          Visit my GitHub profile to see my contribution activity:{" "}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:underline"
          >
            @{username}
          </a>
        </p>
      </Card>
    )
  }

  const weeks: ContributionDay[][] = []
  let currentWeek: ContributionDay[] = []

  contributions.forEach((day) => {
    const dayOfWeek = new Date(day.date).getDay()
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push([...currentWeek])
      currentWeek = []
    }
    currentWeek.push(day)
  })
  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return (
    <Card className="border-2 border-green-500/20 bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Contribution Activity</h3>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total: </span>
            <span className="font-bold text-green-400">{stats.total}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Max Streak: </span>
            <span className="font-bold text-green-400">{stats.streak} days</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`h-3 w-3 rounded-sm transition-all hover:scale-125 hover:ring-2 hover:ring-green-400 ${getLevelColor(day.level)}`}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {hoveredDay && (
        <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm">
          <div className="font-semibold text-green-400">{hoveredDay.date}</div>
          <div className="text-muted-foreground">
            {hoveredDay.count} {hoveredDay.count === 1 ? "contribution" : "contributions"}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`h-3 w-3 rounded-sm ${getLevelColor(level)}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </Card>
  )
}
