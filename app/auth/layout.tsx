import type { ReactNode } from "react"
import { Carousel } from "@/components/carousel"

const carouselItems = [
  {
    title: "A Caring, Trusted Ally is Ready to Help",
    description: "Life Ally is not a clinical provider and does not offer licensed therapeutic services",
    image: "/auth-image.png",
  },
  {
    title: "Life Ally – Your Support Through Every Emotion",
    description:
      "Find comfort, guidance, and understanding with Life Ally—your trusted companion through life's highs and lows.",
  },
  {
    title: "Connect With Support When You Need It",
    description: "Our platform connects you with resources and community support",
  },
]

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left side - Auth Form */}
      <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="py-6">
          <h1 className="text-2xl font-semibold text-[#123231]">Life Ally</h1>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-sm lg:max-w-md">{children}</div>
        </div>
      </div>

      {/* Right side - Image and Text */}
      <div className="relative hidden lg:block lg:w-1/2">
        <Carousel items={carouselItems} />
      </div>
    </div>
  )
}

