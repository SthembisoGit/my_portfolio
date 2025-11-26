// app/api/contact/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server" // your server-side supabase helper

type Body = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function validate(body: Body) {
  if (!body.name || !body.name.trim()) return "Name is required."
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return "A valid email is required."
  if (!body.subject || !body.subject.trim()) return "Subject is required."
  if (!body.message || !body.message.trim()) return "Message is required."
  return null
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient() // server helper should return a server-side client
    const body: Body = await request.json().catch(() => ({} as Body))

    const validationError = validate(body)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const { name, email, subject, message } = body

    const insert = await supabase
      .from("contact_messages")
      .insert([{ name, email, subject, message }])
      .select() // return the inserted row(s)
      .single()

    // insert can be { data, error } or throw depending on helper; normalize:
    const { data, error } = insert as any

    if (error) {
      console.error("Supabase insert error:", error)
      // If the error is a constraint (duplicate) you may change status
      return NextResponse.json({ error: "Failed to save message." }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (err) {
    console.error("Contact route error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
