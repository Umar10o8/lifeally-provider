"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday } from "date-fns"
import { cn } from "@/lib/utils"

interface WeeklyCalendarWidgetProps {
  className?: string
  events?: {
    date: Date
    type: "dot" | "highlight"
  }[]
}

export function WeeklyCalendarWidget({ className, events = [] }: WeeklyCalendarWidgetProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date())

  const nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1))
  }

  const prevWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1))
  }

  const days = eachDayOfInterval({
    start: startOfWeek(currentWeek, { weekStartsOn: 0 }),
    end: endOfWeek(currentWeek, { weekStartsOn: 0 }),
  })

  const weekDays = [
    { key: "sun", label: "S" },
    { key: "mon", label: "M" },
    { key: "tue", label: "T" },
    { key: "wed", label: "W" },
    { key: "thu", label: "T" },
    { key: "fri", label: "F" },
    { key: "sat", label: "S" }
  ]

  return (
    <div className={cn("bg-white rounded-[10px] p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevWeek} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium text-[#282829]">{format(currentWeek, "MMMM yyyy")}</div>
        <button onClick={nextWeek} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center max-w-full">
        {weekDays.map((day) => (
          <div key={day.key} className="text-xs font-medium text-gray-500 mb-2">
            {day.label}
          </div>
        ))}

        {days.map((day) => {
          const hasEvent = events.some((event) => isSameDay(event.date, day))
          const hasDot = events.some((event) => isSameDay(event.date, day) && event.type === "dot")
          const hasHighlight = events.some((event) => isSameDay(event.date, day) && event.type === "highlight")

          return (
            <div
              key={day.toString()}
              className={cn(
                "relative h-7 w-7 mx-auto flex items-center justify-center text-sm rounded-full",
                isToday(day) && "font-bold",
                hasHighlight && "bg-[#282829] text-white",
                !hasHighlight && "hover:bg-gray-100",
              )}
            >
              <span>{format(day, "d")}</span>
              {hasDot && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#ffa83a] rounded-full" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

