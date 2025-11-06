import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { page_path, referrer, user_agent } = body

    // Generate a simple visitor ID from IP or user agent
    const visitorId = user_agent ? Buffer.from(user_agent).toString("base64").slice(0, 32) : "anonymous"

    const { error } = await supabase.from("analytics").insert([
      {
        page_path,
        visitor_id: visitorId,
        user_agent,
        referrer: referrer || null,
      },
    ])

    if (error) {
      console.error("[v0] Analytics insert error:", error)
      // Don't throw - just log and return success to avoid blocking page loads
      return NextResponse.json({ success: true, tracked: false })
    }

    return NextResponse.json({ success: true, tracked: true })
  } catch (error) {
    console.error("[v0] Error tracking analytics:", error)
    // Return success anyway to avoid blocking page loads
    return NextResponse.json({ success: true, tracked: false })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()

    // Get analytics data (admin only)
    const { data: analytics, error } = await supabase
      .from("analytics")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000)

    if (error) throw error

    // Group by page_path and count
    const pageViews = analytics?.reduce(
      (acc, item) => {
        acc[item.page_path] = (acc[item.page_path] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return NextResponse.json({
      total: analytics?.length || 0,
      pageViews,
      recentViews: analytics?.slice(0, 10),
    })
  } catch (error) {
    console.error("[v0] Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
