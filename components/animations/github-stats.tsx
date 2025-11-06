"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Code2, GitBranch, Star } from "lucide-react"

interface GitHubStats {
  totalRepos: number
  totalStars: number
  mostUsedLanguage: string
}

export function GitHubStats({ username = "sthembiso" }: { username?: string }) {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        const repos = await response.json()

        if (Array.isArray(repos)) {
          const totalRepos = repos.length
          const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)

          const languages: { [key: string]: number } = {}
          repos.forEach((repo: any) => {
            if (repo.language) {
              languages[repo.language] = (languages[repo.language] || 0) + 1
            }
          })

          const mostUsedLanguage = Object.keys(languages).reduce((a, b) => (languages[a] > languages[b] ? a : b), "")

          setStats({ totalRepos, totalStars, mostUsedLanguage })
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
  }, [username])

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse border-2 bg-card/50 p-4">
            <div className="h-16 rounded bg-muted" />
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="group border-2 bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-500/10 p-2">
            <Code2 className="h-6 w-6 text-cyan-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.totalRepos}</p>
            <p className="text-sm text-muted-foreground">Repositories</p>
          </div>
        </div>
      </Card>

      <Card className="group border-2 bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-500/10 p-2">
            <Star className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.totalStars}</p>
            <p className="text-sm text-muted-foreground">Total Stars</p>
          </div>
        </div>
      </Card>

      <Card className="group border-2 bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-green-500/10 p-2">
            <GitBranch className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-lg font-bold">{stats.mostUsedLanguage}</p>
            <p className="text-sm text-muted-foreground">Top Language</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
