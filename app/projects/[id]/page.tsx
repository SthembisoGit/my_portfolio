import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"

export const revalidate = 60

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single()

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <article className="py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link href="/projects">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>

            {project.image_url && (
              <div className="mb-8 overflow-hidden rounded-lg border">
                <Image
                  src={project.image_url || "/placeholder.svg"}
                  alt={project.title}
                  width={1200}
                  height={630}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            <div className="mb-6">
              <h1 className="mb-4 text-4xl font-bold tracking-tight">{project.title}</h1>
              <p className="text-xl text-muted-foreground">{project.description}</p>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {project.technologies?.map((tech: string) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mb-8 flex gap-4">
              {project.github_url && (
                <Button asChild>
                  <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Link>
                </Button>
              )}
              {project.live_url && (
                <Button variant="outline" asChild>
                  <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
            </div>

            {project.long_description && (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2>About This Project</h2>
                <p className="whitespace-pre-wrap">{project.long_description}</p>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
