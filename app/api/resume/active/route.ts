import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: resume, error } = await supabase.from("resume_files").select("*").eq("is_active", true).maybeSingle()

    if (error) {
      console.error("[v0] Error fetching resume:", error)
      return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 })
    }

    if (!resume) {
      return NextResponse.json({ error: "No active resume found" }, { status: 404 })
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error("[v0] Error fetching active resume:", error)
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 })
  }
}
