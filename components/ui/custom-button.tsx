import * as React from "react"
import { cn } from "@/lib/utils"

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "icon"
  size?: "default" | "sm" | "lg" | "icon"
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variant === "primary" && "bg-[#20B8B4] text-white hover:bg-[#20B8B4]/90",
          variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          variant === "icon" && "rounded-full bg-white/10 text-white hover:bg-white/20",
          size === "default" && "h-10 py-2 px-4 rounded-md",
          size === "sm" && "h-9 px-3 rounded-md",
          size === "lg" && "h-11 px-8 rounded-md",
          size === "icon" && "h-10 w-10 rounded-full",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
CustomButton.displayName = "CustomButton"

export { CustomButton }

