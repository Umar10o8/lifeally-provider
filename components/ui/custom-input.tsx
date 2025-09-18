"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  showPasswordToggle?: boolean
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, label, showPasswordToggle = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const inputType = showPassword ? "text" : type

    return (
      <div className="space-y-2 w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-[#5F697F] uppercase tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={inputType}
            className={cn(
              "block w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2  text-gray-900 placeholder:text-gray-400 focus:border-[#20B8B4] focus:outline-none focus:ring-0",
              className,
            )}
            ref={ref}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          )}
        </div>
      </div>
    )
  },
)
CustomInput.displayName = "CustomInput"

export { CustomInput }

