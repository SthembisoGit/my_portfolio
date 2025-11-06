"use client"

import { Moon, Sun, Laptop, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Theme = "light" | "dark" | "neon" | "minimal"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "dark"
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    // Remove all theme classes
    document.documentElement.classList.remove("light", "dark", "neon", "minimal")

    // Apply new theme
    if (newTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (newTheme === "neon") {
      document.documentElement.classList.add("dark", "neon")
    } else if (newTheme === "minimal") {
      document.documentElement.classList.add("minimal")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {theme === "light" && <Sun className="h-5 w-5" />}
          {theme === "dark" && <Moon className="h-5 w-5" />}
          {theme === "neon" && <Sparkles className="h-5 w-5" />}
          {theme === "minimal" && <Laptop className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => applyTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyTheme("neon")}>
          <Sparkles className="mr-2 h-4 w-4" />
          Neon (Hacker Mode)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyTheme("minimal")}>
          <Laptop className="mr-2 h-4 w-4" />
          Minimal (Corporate)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
