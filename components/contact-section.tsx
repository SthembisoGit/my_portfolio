"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { TerminalAnimation } from "@/components/animations/terminal-animation"

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTerminal, setShowTerminal] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    setShowTerminal(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      // Terminal animation will handle the success state
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setShowTerminal(false)
      setIsLoading(false)
    }
  }

  const handleTerminalComplete = () => {
    setSuccess(true)
    setShowTerminal(false)
    setIsLoading(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <section id="contact" className="relative bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground">Have a project in mind? Let's work together</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <Card className="group border-2 transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="rounded-lg bg-cyan-500/10 p-3 transition-all group-hover:bg-cyan-500/20">
                  <Mail className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">sthembisosotsha@gmail.com</p>
                  <p className="text-sm text-muted-foreground">224834659@tut4life.ac.za</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-2 transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="rounded-lg bg-purple-500/10 p-3 transition-all group-hover:bg-purple-500/20">
                  <Phone className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
          
                  <p className="text-sm text-muted-foreground">060 743 1268</p>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="rounded-lg bg-green-500/10 p-3 transition-all group-hover:bg-green-500/20">
                  <MapPin className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-sm text-muted-foreground">Tembisa, 1632, Gauteng</p>
                  <p className="text-sm text-muted-foreground">South Africa</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              {showTerminal && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <TerminalAnimation onComplete={handleTerminalComplete} />
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="transition-all focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="transition-all focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                    className="transition-all focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="transition-all focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/20"
                  />
                </div>

                {success && (
                  <p className="animate-in fade-in slide-in-from-bottom-2 text-sm text-green-600 dark:text-green-400">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                )}

                {error && <p className="animate-in fade-in slide-in-from-bottom-2 text-sm text-destructive">{error}</p>}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
