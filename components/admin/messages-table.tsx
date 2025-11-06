"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eye, Trash2, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
}

export function MessagesTable({ messages }: { messages: Message[] }) {
  const router = useRouter()
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleView = async (message: Message) => {
    setSelectedMessage(message)

    if (!message.read) {
      await fetch(`/api/contact/${message.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      })
      router.refresh()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    setDeletingId(id)
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert("Failed to delete message")
      }
    } catch (error) {
      console.error("Error deleting message:", error)
      alert("Failed to delete message")
    } finally {
      setDeletingId(null)
    }
  }

  if (messages.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-12 text-center">
        <p className="text-muted-foreground">No messages yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id} className={!message.read ? "bg-accent/50" : ""}>
                <TableCell>{!message.read && <Badge variant="default">New</Badge>}</TableCell>
                <TableCell className="font-medium">{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell className="max-w-md truncate">{message.subject}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(message.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`mailto:${message.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleView(message)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(message.id)}
                      disabled={deletingId === message.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>
              From {selectedMessage?.name} ({selectedMessage?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="whitespace-pre-wrap text-sm">{selectedMessage?.message}</p>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" asChild>
              <a href={`mailto:${selectedMessage?.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                Reply
              </a>
            </Button>
            <Button onClick={() => setSelectedMessage(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
