"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // 🔒 Guard: ensure we're in the browser
    if (typeof window === 'undefined') return

    // Safely access browser-only values
    const referrer = typeof document !== 'undefined' ? document.referrer : ''
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''

    const trackPageView = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page_path: pathname,
            referrer,
            user_agent: userAgent,
          }),
        })
      } catch (error) {
        console.error("Failed to track page view:", error)
      }
    }

    trackPageView()
  }, [pathname])

  return null
}