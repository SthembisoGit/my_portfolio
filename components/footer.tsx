"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { GitHubActivity } from "@/components/animations/github-activity"
import { Card } from "@/components/ui/card"

export function Footer() {
  return (
    <footer className="relative border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Sthembiso Ndlovu</h3>
            <p className="text-sm text-muted-foreground">
              Computer Science Student | Software Development Intern passionate about building innovative solutions.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#home" className="text-muted-foreground transition-colors hover:text-cyan-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground transition-colors hover:text-purple-500">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-muted-foreground transition-colors hover:text-green-500">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-muted-foreground transition-colors hover:text-cyan-500">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground transition-colors hover:text-purple-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <div className="mb-6 flex gap-4">
              <Link
                href="https://github.com/SthembisoGit"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full border border-cyan-500/50 bg-card p-2 transition-all hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/sthejourney"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full border border-purple-500/50 bg-card p-2 transition-all hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:sthembisosotsha@gmail.com"
                className="group rounded-full border border-green-500/50 bg-card p-2 transition-all hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20"
              >
                <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">Email</span>
              </Link>
            </div>

            <Card className="border-2 border-green-500/30 bg-black/40 p-4 backdrop-blur-sm">
              <GitHubActivity username="SthembisoGit" />
            </Card>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sthembiso Ndlovu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
