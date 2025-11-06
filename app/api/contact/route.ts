import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, subject, message }])
      .select()
      .single()

    if (error) throw error

    // Here you could also send an email notification
    // using a service like Resend, SendGrid, etc.

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error saving contact message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
