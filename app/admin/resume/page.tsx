import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ResumeUpload } from "@/components/admin/resume-upload"
import { ResumeList } from "@/components/admin/resume-list"
import Link from "next/link"

export default async function AdminResumePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: resumes } = await supabase.from("resume_files").select("*").order("uploaded_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Resume Management</h1>
            <p className="mt-2 text-muted-foreground">Upload and manage your resume files</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="space-y-8">
          <ResumeUpload />
          <ResumeList resumes={resumes || []} />
        </div>
      </div>
    </div>
  )
}
