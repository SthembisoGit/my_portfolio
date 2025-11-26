"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Quote, Linkedin, CheckCircle2, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Review {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  linkedin_url?: string
  verified: boolean
  created_at: string
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    linkedin_url: "https://linkedin.com/in/your_username",
  })

  useEffect(() => {
    fetchReviews()
  }, [])

  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [reviews.length])

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews")
      const data = await res.json()
      setReviews(data)
    } catch (error) {
      console.error("Error fetching reviews:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast({
          title: "Review submitted!",
          description: "Thank you! Your review will be published after verification.",
        })
        setFormData({
          name: "",
          email: "",
          role: "",
          company: "",
          content: "",
          rating: 5,
          linkedin_url: "",
        })
        setShowForm(false)
      } else {
        throw new Error("Failed to submit review")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const review = reviews[currentIndex]

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What People Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">Verified recommendations from colleagues and supervisors</p>
        </div>

        {reviews.length > 0 && review ? (
          <div className="mx-auto max-w-4xl">
            <Card className="relative border-2 border-purple-500/20 bg-card/50 p-8 backdrop-blur-sm md:p-12">
              <Quote className="absolute left-8 top-8 h-12 w-12 text-purple-500/20" />

              <div className="relative">
                <div className="mb-6 flex justify-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="mb-8 text-center text-lg leading-relaxed text-foreground md:text-xl">
                  "{review.content}"
                </p>

                <div className="text-center">
                  <div className="mb-1 flex items-center justify-center gap-2 text-lg font-semibold">
                    {review.name}
                    {review.verified && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {review.role} at {review.company}
                  </div>
                  {review.linkedin_url && (
                    <a
                      href={review.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
                    >
                      <Linkedin className="h-4 w-4" />
                      View LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentIndex ? "w-8 bg-purple-500" : "bg-purple-500/30 hover:bg-purple-500/50"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl text-center">
            <Card className="border-2 border-purple-500/20 bg-card/50 p-12 backdrop-blur-sm">
              <p className="text-lg text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
            </Card>
          </div>
        )}

        <div className="mt-8 text-center">
          {!showForm ? (
            <Button onClick={() => setShowForm(true)} size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Send className="mr-2 h-5 w-5" />
              Leave a Review
            </Button>
          ) : (
            <Card className="mx-auto max-w-2xl border-2 border-purple-500/20 bg-card/50 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-xl font-bold">Submit Your Review</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Full Name *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Email *</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Your Role *</label>
                    <Input
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Company *</label>
                    <Input
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Tech Corp"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">LinkedIn Profile URL (for verification)</label>
                  <Input
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Adding your LinkedIn helps us verify your review faster
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            rating <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Your Review *</label>
                  <Textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Share your experience working with Sthembiso..."
                    rows={5}
                    className="resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  * Your review will be verified and published after approval. We may contact you via email for
                  verification.
                </p>
              </form>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
