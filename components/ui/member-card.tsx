import Image from "next/image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MemberCardProps {
  id: string
  name: string
  image: string
  rating: number
  reviewCount: number
  description: string
  className?: string
}

export function MemberCard({ id, name, image, rating, reviewCount, description, className }: MemberCardProps) {
  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-[#ffa83a] text-[#ffa83a]" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={`star-${i}`}
            className="h-4 w-4 fill-[#ffa83a] text-[#ffa83a]"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />,
        )
      } else {
        stars.push(<Star key={`star-${i}`} className="h-4 w-4 text-gray-300" />)
      }
    }
    return stars
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white rounded-[10px] shadow-sm hover:shadow-md transition-shadow duration-200",
        className,
      )}
    >
      <Link href={`/dashboard/members/${id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-[10px]">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">{renderStars()}</div>
          <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
        </div>

        <Link href={`/dashboard/members/${id}`} className="block">
          <h3 className="text-lg font-semibold mb-2 text-[#282829]">{name}</h3>
        </Link>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">{description}</p>

        <Link
          href="/dashboard/schedule"
          className="inline-flex items-center justify-center w-[153px] h-10 rounded-lg p-2 gap-2 bg-[#20B8B4] text-white text-[12px] font-semibold"
        >
          View Schedule
        </Link>
      </div>
    </div>
  )
}

