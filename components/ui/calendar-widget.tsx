"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"
import { cn } from "@/lib/utils"

interface CalendarWidgetProps {
  className?: string
  events?: {
    date: Date
    type: "dot" | "highlight"
  }[]
}

export function CalendarWidget({ className, events = [] }: CalendarWidgetProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"]

  return (
    <div className={cn("bg-white rounded-lg", className)}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 text-[#282829]">
          <span className="font-medium">{format(currentMonth, "MMMM yyyy")}</span>
        </div>
        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekDays.map((day) => (
          <div key={day} className="text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}

        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const hasEvent = events.some((event) => isSameDay(event.date, day))
          const hasDot = events.some((event) => isSameDay(event.date, day) && event.type === "dot")
          const hasHighlight = events.some((event) => isSameDay(event.date, day) && event.type === "highlight")

          return (
            <div
              key={day.toString()}
              className={cn(
                "relative h-8 w-8 flex items-center justify-center text-sm rounded-full",
                !isCurrentMonth && "text-gray-300",
                isToday(day) && "font-bold",
                hasHighlight && "bg-[#282829] text-white",
                !hasHighlight && "hover:bg-gray-100",
              )}
            >
              {format(day, "d")}
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

