"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface VerificationCodeInputProps {
  length?: number
  onComplete?: (code: string) => void
}

export function VerificationCodeInput({ length = 5, onComplete }: VerificationCodeInputProps) {
  const [code, setCode] = React.useState<string[]>(Array(length).fill(""))
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  // Initialize refs array
  React.useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    // Only accept single digit
    if (value.length > 1) return

    // Update the code array
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check if code is complete
    if (newCode.every((digit) => digit) && onComplete) {
      onComplete(newCode.join(""))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Move to next input on right arrow
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Move to previous input on left arrow
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Only process if pasted data matches expected length
    if (pastedData.length === length && /^\d+$/.test(pastedData)) {
      const newCode = pastedData.split("")
      setCode(newCode)

      // Focus the last input
      inputRefs.current[length - 1]?.focus()

      if (onComplete) {
        onComplete(pastedData)
      }
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={code[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={cn(
            "w-14 h-14 text-center text-xl border border-gray-300 rounded-md focus:border-[#282829] focus:outline-none focus:ring-0",
            code[index] && "border-[#282829]",
          )}
          aria-label={`Digit ${index + 1} of verification code`}
        />
      ))}
    </div>
  )
}

