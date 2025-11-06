import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Deactivate all resumes
    await supabase.from("resume_files").update({ is_active: false }).neq("id", "00000000-0000-0000-0000-000000000000")

    // Activate the selected resume
    const { data, error } = await supabase
      .from("resume_files")
      .update({ is_active: true })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error activating resume:", error)
    return NextResponse.json({ error: "Failed to activate resume" }, { status: 500 })
  }
}
