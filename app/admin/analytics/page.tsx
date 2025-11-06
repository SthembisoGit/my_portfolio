import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { AnalyticsChart } from "@/components/admin/analytics-chart"

export default async function AdminAnalyticsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch analytics data
  const { data: analytics } = await supabase
    .from("analytics")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000)

  // Calculate statistics
  const totalViews = analytics?.length || 0

  // Group by page
  const pageViews = analytics?.reduce((acc: Record<string, number>, item) => {
    acc[item.page_path] = (acc[item.page_path] || 0) + 1
    return acc
  }, {})

  const topPages = Object.entries(pageViews || {})
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 10)

  // Group by date for chart
  const viewsByDate = analytics?.reduce((acc: Record<string, number>, item) => {
    const date = new Date(item.created_at).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(viewsByDate || {})
    .map(([date, views]) => ({ date, views }))
    .slice(-30) // Last 30 days

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="mt-2 text-muted-foreground">Track your portfolio's performance</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{totalViews}</div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Views Over Time (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart data={chartData} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map(([page, views]) => (
                <div key={page} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{page}</span>
                  <span className="text-sm text-muted-foreground">{views} views</span>
                </div>
              ))}
              {topPages.length === 0 && <p className="text-sm text-muted-foreground">No data yet</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
