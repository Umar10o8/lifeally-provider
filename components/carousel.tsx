"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"

export interface CarouselItem {
  title: string
  description: string
  image?: string
}

interface CarouselProps {
  items: CarouselItem[]
}
//
export function Carousel({ items }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div className="relative h-full w-full">
      {items[currentSlide].image ? (
        <Image
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={items[currentSlide].image}
          alt="Life Ally"
          priority
          fill
        />
      ) : (
        <div 
          className="absolute inset-0 h-full w-full" 
          style={{ background: "linear-gradient(to bottom, #0670BA 0%, #05588F 50%, #044065 100%)" }}
        />
      )}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-12">
        <h2 className="text-4xl font-bold text-white mb-4">{items[currentSlide].title}</h2>
        <p className="text-white text-lg mb-8">{items[currentSlide].description}</p>
        <div className="flex justify-between items-center">
          <span className="text-white">
            {currentSlide + 1} of {items.length}
          </span>
          <div className="flex gap-2">
            <CustomButton variant="icon" size="icon" onClick={prevSlide} aria-label="Previous slide">
              <ChevronLeft className="h-4 w-4" />
            </CustomButton>
            <CustomButton variant="icon" size="icon" onClick={nextSlide} aria-label="Next slide">
              <ChevronRight className="h-4 w-4" />
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
}

