"use client"

import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoReviewProps {
  name: string
  title: string
  thumbnail: string
  className?: string
}

export function VideoReview({ name, title, thumbnail, className }: VideoReviewProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden h-[400px] rounded-[10px] group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl",
        className,
      )}
    >
      <div className="relative h-[400px] w-full bg-cover bg-center" style={{ backgroundImage: `url(${thumbnail})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />

        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm opacity-80">{title}</p>
        </div>

        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/40"
          aria-label={`Play ${name}'s review`}
        >
          <Play className="h-6 w-6 text-white fill-white" />
        </button>
      </div>
    </div>
  )
}

