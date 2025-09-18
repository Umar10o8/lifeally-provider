import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export interface CustomSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

const CustomSelect = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ className, label, options, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 uppercase">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              "block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-gray-900 focus:border-[#282829] focus:outline-none focus:ring-0 sm:text-sm",
              className,
            )}
            ref={ref}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    )
  },
)
CustomSelect.displayName = "CustomSelect"

export { CustomSelect }

