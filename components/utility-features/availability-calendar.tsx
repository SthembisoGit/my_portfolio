"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, XCircle } from "lucide-react"

interface TimeSlot {
  time: string
  available: boolean
}

interface DaySchedule {
  date: string
  day: string
  slots: TimeSlot[]
}

export function AvailabilityCalendar() {
  const [selectedWeek, setSelectedWeek] = useState(0)
  const [schedule, setSchedule] = useState<DaySchedule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAvailability()
  }, [])

  const fetchAvailability = async () => {
    try {
      const res = await fetch("/api/availability")
      const data = await res.json()

      if (data.length > 0) {
        setSchedule(data)
      } else {
        // Fallback to default schedule if no data
        setSchedule(generateDefaultSchedule())
      }
    } catch (error) {
      console.error("Error fetching availability:", error)
      setSchedule(generateDefaultSchedule())
    } finally {
      setLoading(false)
    }
  }

  const generateDefaultSchedule = (): DaySchedule[] => {
    const schedule: DaySchedule[] = []
    const today = new Date()
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const dayOfWeek = date.getDay()
      const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5

      schedule.push({
        date: date.toISOString().split("T")[0],
        day: daysOfWeek[dayOfWeek],
        slots: [
          { time: "08:00 - 11:00", available: isWeekday },
          { time: "11:00 - 13:00", available: isWeekday },
          { time: "14:00 - 16:00", available: isWeekday },
          { time: "16:00 - 18:00", available: isWeekday || !isWeekday },
        ],
      })
    }

    return schedule
  }

  if (loading) {
    return (
      <Card className="border-2 border-purple-500/20 bg-card/50 p-6 backdrop-blur-sm">
        <div className="text-center text-muted-foreground">Loading availability...</div>
      </Card>
    )
  }

  const currentWeek = schedule.slice(selectedWeek * 7, (selectedWeek + 1) * 7)

  return (
    <Card className="border-2 border-purple-500/20 bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Availability Calendar</h3>
          <p className="text-sm text-muted-foreground">Schedule a call or interview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setSelectedWeek(0)} disabled={selectedWeek === 0}>
            This Week
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelectedWeek(1)} disabled={selectedWeek === 1}>
            Next Week
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid min-w-[800px] grid-cols-7 gap-2">
          {currentWeek.map((day, index) => (
            <div key={index} className="space-y-2">
              <div className="rounded-lg border border-border/50 bg-card/30 p-2 text-center">
                <div className="text-xs text-muted-foreground">{day.day}</div>
                <div className="font-semibold">{new Date(day.date).getDate()}</div>
              </div>

              <div className="space-y-1">
                {day.slots.map((slot, slotIndex) => (
                  <button
                    key={slotIndex}
                    className={`w-full rounded border p-2 text-xs transition-all ${
                      slot.available
                        ? "border-green-500/30 bg-green-500/10 hover:bg-green-500/20"
                        : "border-border/30 bg-secondary/50 cursor-not-allowed opacity-50"
                    }`}
                    disabled={!slot.available}
                  >
                    <div className="mb-1 flex items-center justify-center gap-1">
                      {slot.available ? (
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                      ) : (
                        <XCircle className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <div>{slot.time}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-4 rounded-lg border border-border/50 bg-card/30 p-4">
        <Calendar className="h-5 w-5 text-purple-400" />
        <div className="flex-1">
          <div className="mb-1 font-semibold">Current Availability</div>
          <p className="text-sm text-muted-foreground">
            Available weekdays 9 AM - 6 PM SAST (GMT+2). Currently completing WIL at Denel Aerospace. Available for
            full-time opportunities immediately.
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-400" />
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Unavailable</span>
        </div>
      </div>
    </Card>
  )
}
