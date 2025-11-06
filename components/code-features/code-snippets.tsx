"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodeSnippet {
  title: string
  description: string
  language: string
  code: string
  tags: string[]
}

const snippets: CodeSnippet[] = [
  {
    title: "Binary Search Implementation",
    description: "Efficient O(log n) search algorithm for sorted arrays",
    language: "Java",
    code: `public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1; // Not found
}`,
    tags: ["Algorithm", "Search", "Java"],
  },
  {
    title: "REST API Error Handler",
    description: "Centralized error handling middleware for Express.js",
    language: "JavaScript",
    code: `const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;`,
    tags: ["Node.js", "REST API", "Error Handling"],
  },
  {
    title: "SQL Query Optimization",
    description: "Optimized query with proper indexing and joins",
    language: "SQL",
    code: `-- Before: Slow query with subquery
SELECT * FROM orders 
WHERE customer_id IN (
  SELECT id FROM customers WHERE country = 'USA'
);

-- After: Optimized with JOIN and index
CREATE INDEX idx_customers_country ON customers(country);

SELECT o.* 
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
WHERE c.country = 'USA';`,
    tags: ["SQL", "Optimization", "Database"],
  },
  {
    title: "React Custom Hook",
    description: "Reusable hook for API data fetching with loading states",
    language: "TypeScript",
    code: `import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}`,
    tags: ["React", "TypeScript", "Hooks"],
  },
]

export function CodeSnippets() {
  const [selectedSnippet, setSelectedSnippet] = useState(0)
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    // 🔒 Guard: ensure we're in the browser
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      console.warn("Clipboard API not available")
      return
    }

    navigator.clipboard.writeText(snippets[selectedSnippet].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const snippet = snippets[selectedSnippet]

  return (
    <Card className="border-2 border-purple-500/20 bg-card/50 p-6 backdrop-blur-sm">
      <h3 className="mb-6 text-xl font-bold">Code Snippets Showcase</h3>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Snippet List */}
        <div className="space-y-2">
          {snippets.map((s, index) => (
            <button
              key={index}
              onClick={() => setSelectedSnippet(index)}
              className={`w-full rounded-lg border p-3 text-left transition-all ${
                selectedSnippet === index
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-border bg-card/30 hover:border-purple-500/50"
              }`}
            >
              <div className="mb-1 font-semibold">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.language}</div>
            </button>
          ))}
        </div>

        {/* Snippet Display */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold">{snippet.title}</h4>
                <p className="text-sm text-muted-foreground">{snippet.description}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={copyCode}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {snippet.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute right-2 top-2 rounded bg-black/50 px-2 py-1 text-xs text-muted-foreground">
              {snippet.language}
            </div>
            <pre className="overflow-x-auto rounded-lg border border-border bg-black/50 p-4 text-sm">
              <code className="text-green-400">{snippet.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </Card>
  )
}