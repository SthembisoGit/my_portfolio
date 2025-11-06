import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("availability_settings").select("*").order("date", { ascending: true })

    if (error) throw error

    // Transform database data into schedule format
    const schedule = transformToSchedule(data || [])

    return NextResponse.json(schedule)
  } catch (error) {
    console.error("Error fetching availability:", error)
    return NextResponse.json([], { status: 200 }) // Return empty array to use default
  }
}

function transformToSchedule(data: any[]) {
  // Group by date and transform into DaySchedule format
  const scheduleMap = new Map()

  data.forEach((item) => {
    if (!scheduleMap.has(item.date)) {
      const date = new Date(item.date)
      scheduleMap.set(item.date, {
        date: item.date,
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        slots: [],
      })
    }

    scheduleMap.get(item.date).slots.push({
      time: item.time_slot,
      available: item.available,
    })
  })

  return Array.from(scheduleMap.values())
}
