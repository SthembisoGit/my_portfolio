// app/components/ContactSection.tsx
"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { TerminalAnimation } from "@/components/animations/terminal-animation"

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTerminal, setShowTerminal] = useState(false)

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // fallback timeout in case terminal animation never calls onComplete
  const terminalFallbackRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (terminalFallbackRef.current) {
        clearTimeout(terminalFallbackRef.current)
      }
    }
  }, [])

  const validate = (d: FormState) => {
    if (!d.name.trim()) return "Please enter your name."
    if (!d.email.trim()) return "Please enter your email."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return "Please enter a valid email."
    if (!d.subject.trim()) return "Please enter a subject."
    if (!d.message.trim()) return "Please enter a message."
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const clientError = validate(formData)
    if (clientError) {
      setError(clientError)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      // try parse JSON safely
      let payload: any = null
      try {
        payload = await response.json()
      } catch {
        payload = null
      }

      if (!response.ok) {
        const message =
          payload?.error || payload?.message || `Failed to send message (status ${response.status})`
        throw new Error(message)
      }

      // success acknowledged by server — show terminal animation
      setShowTerminal(true)

      // fallback: if TerminalAnimation doesn't call onComplete, settle after 12s
      terminalFallbackRef.current = window.setTimeout(() => {
        handleTerminalComplete()
      }, 12_000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.")
      setIsLoading(false)
      setShowTerminal(false)
    }
  }

  const handleTerminalComplete = () => {
    // clear any fallback
    if (terminalFallbackRef.current) {
      clearTimeout(terminalFallbackRef.current)
      terminalFallbackRef.current = null
    }

    setSuccess(true)
    setShowTerminal(false)
    setIsLoading(false)
    setFormData({ name: "", email: "", subject: "", message: "" })

    // hide success after a short time (optional)
    setTimeout(() => setSuccess(false), 5000)
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
                  <p className="text-sm text-muted-foreground">068 365 7773</p>
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

          <Card className="lg:col-span-2 relative">
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
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="transition-all focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="transition-all focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                    className="transition-all focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="transition-all focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/20"
                    required
                  />
                </div>

                {success && (
                  <p className="animate-in fade-in slide-in-from-bottom-2 text-sm text-green-600 dark:text-green-400">
                    Message saved — thanks! I'll get back to you soon.
                  </p>
                )}

                {error && <p className="animate-in fade-in slide-in-from-bottom-2 text-sm text-destructive">{error}</p>}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading || showTerminal}
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
