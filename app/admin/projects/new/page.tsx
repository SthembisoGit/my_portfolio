import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProjectForm } from "@/components/admin/project-form"

export default async function NewProjectPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Create New Project</h1>
        <ProjectForm />
      </div>
    </div>
  )
}
