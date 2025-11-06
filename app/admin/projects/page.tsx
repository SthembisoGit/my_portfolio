import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ProjectsTable } from "@/components/admin/projects-table"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: projects } = await supabase.from("projects").select("*").order("order_index", { ascending: true })

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Manage Projects</h1>
            <p className="mt-2 text-muted-foreground">Create, edit, and organize your portfolio projects</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/admin">Back to Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
          </div>
        </div>

        <ProjectsTable projects={projects || []} />
      </div>
    </div>
  )
}
