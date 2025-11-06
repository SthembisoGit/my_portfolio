import { createClient } from "@/lib/supabase/server"
import { del } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the resume to delete from blob
    const { data: resume } = await supabase.from("resume_files").select("blob_url").eq("id", id).single()

    if (resume?.blob_url) {
      await del(resume.blob_url)
    }

    // Delete from database
    const { error } = await supabase.from("resume_files").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting resume:", error)
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 })
  }
}
