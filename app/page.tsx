import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CursorGlow } from "@/components/animations/cursor-glow"
import { NeonGrid } from "@/components/animations/neon-grid"
import { SkillRadarChart } from "@/components/visualizations/skill-radar-chart"
import { ContributionHeatmap } from "@/components/visualizations/contribution-heatmap"
import { ProjectTimeline } from "@/components/visualizations/project-timeline"
import { LivePlayground } from "@/components/code-features/live-playground"
import { PerformanceDashboard } from "@/components/code-features/performance-dashboard"
import { VisitorCounter } from "@/components/realtime-features/visitor-counter"
import { ReviewsSection } from "@/components/ui-polish/reviews-section"
import { EasterEggs } from "@/components/ui-polish/easter-eggs"
import { TechStackTool } from "@/components/utility-features/tech-stack-tool"
import { AvailabilityCalendar } from "@/components/utility-features/availability-calendar"
import { PortfolioPDFGenerator } from "@/components/utility-features/portfolio-pdf-generator"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <CursorGlow />
      <NeonGrid />
      <EasterEggs />
      <Navigation />
      <main>
        <HeroSection />
         <ExperienceSection />
        <EducationSection />
        
        <SkillsSection />
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Interactive Insights</h2>
              <p className="mt-4 text-lg text-muted-foreground">Explore my skills, contributions, and journey</p>
            </div>
            <div className="space-y-8">
              <SkillRadarChart />
            </div>
          </div>
        </section>
        
       <AvailabilityCalendar />
        <ReviewsSection />
       
                
               
         
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
