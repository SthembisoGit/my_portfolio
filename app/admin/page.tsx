import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { FolderKanban, MessageSquare, FileText, Eye, TrendingUp, LogOut } from "lucide-react"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch statistics
  const [projectsResult, messagesResult, blogResult, analyticsResult] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact" }),
    supabase.from("contact_messages").select("id, read", { count: "exact" }),
    supabase.from("blog_posts").select("id", { count: "exact" }),
    supabase.from("analytics").select("id", { count: "exact" }),
  ])

  const stats = {
    projects: projectsResult.count || 0,
    messages: messagesResult.count || 0,
    unreadMessages: messagesResult.data?.filter((m) => !m.read).length || 0,
    blogPosts: blogResult.count || 0,
    pageViews: analyticsResult.count || 0,
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Welcome back, {user.email}</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <Button variant="outline" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.projects}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.messages}</div>
              {stats.unreadMessages > 0 && (
                <p className="text-xs text-muted-foreground">{stats.unreadMessages} unread</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.blogPosts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pageViews}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin/projects">
              <Card className="transition-all hover:border-primary hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FolderKanban className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Projects</h3>
                    <p className="text-sm text-muted-foreground">Manage your portfolio projects</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/messages">
              <Card className="transition-all hover:border-primary hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Messages</h3>
                    <p className="text-sm text-muted-foreground">View contact form submissions</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/blog">
              <Card className="transition-all hover:border-primary hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Blog Posts</h3>
                    <p className="text-sm text-muted-foreground">Create and edit blog posts</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/resume">
              <Card className="transition-all hover:border-primary hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Resume</h3>
                    <p className="text-sm text-muted-foreground">Upload and manage resume files</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/analytics">
              <Card className="transition-all hover:border-primary hover:shadow-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Analytics</h3>
                    <p className="text-sm text-muted-foreground">View site traffic and engagement</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
