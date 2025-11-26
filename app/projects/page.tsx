import { createClient } from "@/lib/supabase/server"
import { ProjectCard } from "@/components/project-card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const revalidate = 60 

export default async function ProjectsPage(){
  const supabase = await createClient()

  const { data: projects } = await supabase.from("projects").select("*").order("order_index", { ascending: true })

  const featuredProjects = projects?.filter((p) => p.featured) || []
  const otherProjects = projects?.filter((p) => !p.featured) || []

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">My Projects</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                A collection of my work showcasing various technologies and solutions
              </p>
            </div>

            {featuredProjects.length > 0 && (
              <div className="mb-16">
                <h2 className="mb-8 text-2xl font-semibold">Featured Projects</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} featured />
                  ))}
                </div>
              </div>
            )}

            {otherProjects.length > 0 && (
              <div>
                <h2 className="mb-8 text-2xl font-semibold">Other Projects</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {otherProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {!projects ||
              (projects.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No projects yet. Check back soon!</p>
                </div>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
