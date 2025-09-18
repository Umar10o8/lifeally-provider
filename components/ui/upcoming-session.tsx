import Image from "next/image"
import { cn } from "@/lib/utils"

interface UpcomingSessionProps {
  title: string
  time: string
  provider: {
    name: string
    image: string
  }
  className?: string
}

export function UpcomingSession({ title, time, provider, className }: UpcomingSessionProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
        <Image src={provider.image || "/placeholder.svg"} alt={provider.name} fill className="object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-[#282829] truncate">{title}</h3>
        <p className="text-xs text-gray-500 truncate">{provider.name}</p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-xs font-medium text-[#282829]">{time}</p>
      </div>
    </div>
  )
}

