import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { DevConsole } from "@/components/animations/dev-console"
import { AIChatbot } from "@/components/ai-features/ai-chatbot"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sthembiso Ndlovu - Computer Science Student | Software Developer",
  description:
    "Portfolio of Sthembiso Ndlovu, a Computer Science student and Software Development Intern specializing in Java, Python, and Full-Stack Development",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AnalyticsTracker />
        {children}
        <DevConsole />
        <AIChatbot />
        <Analytics />
      </body>
    </html>
  )
}
