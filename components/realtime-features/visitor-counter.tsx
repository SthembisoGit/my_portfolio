"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Users, Eye, Globe, TrendingUp } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface VisitorStats {
  current: number
  today: number
  total: number
  topPages: { page: string; count: number }[]
}

export function VisitorCounter() {
  const [stats, setStats] = useState<VisitorStats>({
    current: 0,
    today: 0,
    total: 0,
    topPages: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const fetchRealStats = async () => {
      try {
        const supabase = createClient()

        const { count: totalCount } = await supabase
          .from("analytics")
          .select("*", { count: "exact", head: true })

        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const { count: todayCount } = await supabase
          .from("analytics")
          .select("*", { count: "exact", head: true })
          .gte("created_at", today.toISOString())

        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
        const { count: currentCount } = await supabase
          .from("analytics")
          .select("*", { count: "exact", head: true })
          .gte("created_at", fiveMinutesAgo.toISOString())

        const { data: pagesData } = await supabase.from("analytics").select("page").limit(1000)

        const pageCounts: { [key: string]: number } = {}
        pagesData?.forEach((item: { page: string }) => {
          pageCounts[item.page] = (pageCounts[item.page] || 0) + 1
        })

        const topPages = Object.entries(pageCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([page, count]) => ({ page, count }))

        setStats({
          current: currentCount || 0,
          today: todayCount || 0,
          total: totalCount || 0,
          topPages,
        })
      } catch (error) {
        console.error("Failed to fetch visitor stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRealStats()
    const interval = setInterval(fetchRealStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="border-2 border-cyan-500/20 bg-card/50 p-6 backdrop-blur-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 rounded bg-muted" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded bg-muted" />
            ))}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-cyan-500/20 bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold">Live Visitor Analytics</h3>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-4">
          <div className="rounded-lg bg-green-500/10 p-2">
            <Eye className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">{stats.current}</div>
            <div className="text-xs text-muted-foreground">Last 5 min</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-4">
          <div className="rounded-lg bg-cyan-500/10 p-2">
            <Users className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400">{stats.today}</div>
            <div className="text-xs text-muted-foreground">Today</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-4">
          <div className="rounded-lg bg-purple-500/10 p-2">
            <TrendingUp className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">{stats.total}</div>
            <div className="text-xs text-muted-foreground">All Time</div>
          </div>
        </div>
      </div>

      {stats.topPages.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span>Top Pages</span>
          </div>
          <div className="space-y-2">
            {stats.topPages.map((page) => (
              <div key={page.page} className="flex items-center justify-between">
                <span className="truncate text-sm text-muted-foreground">{page.page}</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
                      style={{
                        width: `${stats.total > 0 ? (page.count / stats.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm font-medium">{page.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}