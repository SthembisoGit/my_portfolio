"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Copy, Check } from "lucide-react"

const examples = [
  {
    name: "Portfolio Stats",
    code: `// Calculate portfolio metrics
const skills = ["Java", "Python", "JavaScript", "SQL", "Git"];
const experience = [
  { company: "Denel Aerospace", months: 4 },
  { company: "Outdoor Warehouse", months: 18 },
  { company: "We Whiten", months: 3 }
];

const totalMonths = experience.reduce((sum, job) => sum + job.months, 0);
const years = Math.floor(totalMonths / 12);
const months = totalMonths % 12;

console.log(\`Skills: \${skills.length} technologies\`);
console.log(\`Experience: \${years} year(s) and \${months} month(s)\`);
console.log(\`Companies: \${experience.map(e => e.company).join(", ")}\`);`,
  },
  {
    name: "GitHub Activity",
    code: `// Fetch real GitHub stats
fetch("https://api.github.com/users/SthembisoGit")
  .then(res => res.json())
  .then(data => {
    console.log("GitHub Profile: @" + data.login);
    console.log("Public Repos: " + data.public_repos);
    console.log("Followers: " + data.followers);
    console.log("Total Stars: Calculating...");
  })
  .catch(err => console.error("Error:", err.message));`,
  },
  {
    name: "Skills Analyzer",
    code: `// Analyze skill categories
const skillCategories = {
  languages: ["Java", "Python", "JavaScript", "SQL"],
  frameworks: ["React", "Node.js", "Express"],
  tools: ["Git", "Linux", "REST APIs"],
  databases: ["PostgreSQL", "MySQL", "Supabase"]
};

Object.entries(skillCategories).forEach(([category, skills]) => {
  console.log(\`\${category.toUpperCase()}: \${skills.length} skills\`);
  skills.forEach(skill => console.log(\`  ✓ \${skill}\`));
  console.log("");
});`,
  },
]

export function LivePlayground() {
  const [code, setCode] = useState(examples[0].code)
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    setOutput([])

    const logs: string[] = []
    const originalLog = console.log

    console.log = (...args) => {
      logs.push(args.map((arg) => JSON.stringify(arg).replace(/^"|"$/g, "")).join(" "))
    }

    try {
      // eslint-disable-next-line no-eval
      eval(code)

      // For async code, wait a bit
      setTimeout(() => {
        setOutput(logs.length > 0 ? logs : ["Code executed successfully (no output)"])
        setIsRunning(false)
      }, 1000)
    } catch (error) {
      setOutput([`Error: ${error instanceof Error ? error.message : String(error)}`])
      setIsRunning(false)
    } finally {
      console.log = originalLog
    }
  }

  const resetCode = () => {
    setCode(examples[0].code)
    setOutput([])
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-2 border-cyan-500/20 bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Live Code Playground</h3>
          <p className="text-sm text-muted-foreground">Try portfolio-related code examples</p>
        </div>
        <div className="flex gap-2">
          {examples.map((example) => (
            <Button
              key={example.name}
              variant="outline"
              size="sm"
              onClick={() => {
                setCode(example.code)
                setOutput([])
              }}
              className="text-xs"
            >
              {example.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Code Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">JavaScript Code</label>
            <Button variant="ghost" size="sm" onClick={copyCode} className="h-8">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-64 w-full rounded-lg border border-border bg-black/50 p-4 font-mono text-sm text-foreground focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            spellCheck={false}
          />
          <div className="flex gap-2">
            <Button onClick={runCode} disabled={isRunning} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
              <Play className="mr-2 h-4 w-4" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
            <Button onClick={resetCode} variant="outline">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Output Console */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Console Output</label>
          <div className="h-64 overflow-y-auto rounded-lg border border-border bg-black/50 p-4 font-mono text-sm">
            {output.length === 0 ? (
              <div className="text-muted-foreground">Click "Run Code" to see output...</div>
            ) : (
              output.map((line, index) => (
                <div key={index} className="mb-1 text-green-400">
                  {"> "}
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Try editing the code above or load one of the portfolio examples. This playground runs JavaScript in your
        browser.
      </p>
    </Card>
  )
}
