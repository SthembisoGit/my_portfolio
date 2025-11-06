import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessagesTable } from "@/components/admin/messages-table"
import Link from "next/link"

export default async function AdminMessagesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  const unreadCount = messages?.filter((m) => !m.read).length || 0

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Contact Messages</h1>
            <p className="mt-2 text-muted-foreground">
              {unreadCount > 0 && `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin">Back to Dashboard</Link>
          </Button>
        </div>

        <MessagesTable messages={messages || []} />
      </div>
    </div>
  )
}
