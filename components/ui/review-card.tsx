import Image from "next/image"
import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ReviewCardProps {
  name: string
  role: string
  rating: number
  date: string
  content: string
  avatar: string
}

export function ReviewCard({ name, role, rating, date, content, avatar }: ReviewCardProps) {
  return (
    <div className="p-2 pt-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden">
          <Image src={avatar || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-medium text-[#282829]">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      

      <p className="text-[#5E6883]">{content}</p>
      <div className="flex items-center gap-2 mt-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${star <= rating ? "fill-[#ffa83a] text-[#ffa83a]" : "fill-gray-200 text-gray-200"}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">({rating})</span>
        <span className="text-sm text-gray-500 ml-auto">{date}</span>
      </div>
    </div>
  )
}

